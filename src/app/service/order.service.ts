import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(
    
     private http: HttpClient
  ) { }

   
  private STOCK_GROUP_LIST = `http://aborong.com/orderapi/orderapi/user/list`;

  

  getProductGList(): Observable<any> {
    return this.http.get(`${this.STOCK_GROUP_LIST}`);
  }

  



  getGroupList(): Observable<any> {
    console.log("UPDATE",environment.baseUrl);
    // headers: <String, String>{
    //   'Content-Type': 'application/json; charset=UTF-8',
    // },


    return this.http.get(`${this.STOCK_GROUP_LIST}`, );
    // console.log("UPDATE",environment.baseUrl);
  }

  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  // }



  
}
