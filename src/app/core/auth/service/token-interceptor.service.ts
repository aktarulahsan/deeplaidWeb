import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(this.addAuthenticationToken(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        // We don't want to refresh token for some requests like login or refresh token itself
        // So we verify url and we throw an error if it's the case
        console.log("Login request error", error.status);
        if (
          request.url.includes("refreshtoken") ||
          request.url.includes("oauth/token")
        ) {
          // We do another check to see if refresh token failed
          // In this case we want to logout user and to redirect it to login page

          if (request.url.includes("refreshtoken")) {
            this.authService.logout();
          }

          // return Observable.throw(error);
          return throwError(error);
        }

        // If error status is different than 401 we want to skip refresh token
        // So we check that and throw the error if it's the case
        if (error.status !== 401) {
          // return Observable.throw(error);
          return throwError(error);
        }

        if (this.refreshTokenInProgress) {
          // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
          // – which means the new token is ready and we can retry the request again
          return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request)))
          );
        } else {
          this.refreshTokenInProgress = true;

          // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
          this.refreshTokenSubject.next(null);

          // Call auth.refreshAccessToken(this is an Observable that will be returned)
          return this.authService
            .refreshAccessToken().pipe(
              switchMap((token: any) => {
                //When the call to refreshToken completes we reset the refreshTokenInProgress to false
                // for the next time the token needs to be refreshed
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(token);

                return next.handle(this.addAuthenticationToken(request));
              }),
              catchError((err: any) => {
                this.refreshTokenInProgress = false;

                this.authService.logout();
                return Observable.throw(error);
              })
            )
        }
      })
    );
  }

  addAuthenticationToken(request) {
    // Get access token from Local Storage
    const accessToken = this.authService.getAccessToken();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      }
    });
  }
}
