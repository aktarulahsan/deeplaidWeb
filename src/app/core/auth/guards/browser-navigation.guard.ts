import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
 
import { filter, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
 

@Injectable({
  providedIn: 'root'
})
export class BrowserNavigationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
