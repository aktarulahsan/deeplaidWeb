 

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { OrderMasterModel } from 'src/app/model/ordermaster.model';
// import {BaseResponse} from 'src/app/oms/order/model/baseresponse.model'
import { environment } from 'src/environments/environment';
// import { Serializer } from 'src/app/core/interface/Serializer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { BaseResponse } from '../model/baseresponse.Model';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient, private http: HttpClient
  ) { }

  // constructor(
  //   private httpClient: HttpClient, private http: HttpClient,
  //   private apiUrl: string,
  //   private endpoint: string,
  //   private serializer: Serializer) { }

  private ORDER_END_POINT = `customer`;

  private SAVE_ORDER= `${environment.baseUrl}${environment.orderApiUrl}/${this.ORDER_END_POINT}/create`;
  private UPDATE_ORDER = `${environment.baseUrl}${environment.orderApiUrl}/${this.ORDER_END_POINT}/update`;
  private  ORDER_LIST = `${environment.baseUrl}${environment.orderApiUrl}/${this.ORDER_END_POINT}/list`;
  private FIND_BY_ID_ORDER = `${environment.baseUrl}${environment.orderApiUrl}/${this.ORDER_END_POINT}/findById`;
  private FIND_DETAILS_BY_ID = `${environment.baseUrl}${environment.orderApiUrl}/${this.ORDER_END_POINT}/findDetailsById`;


  getBranchList(): Observable<any> {
    return this.http.get(`${this.ORDER_LIST}`);
  }
  
  // save(data: Customer): Observable<Customer> {
  //   return this.http
  //     .post<Customer>(this.SAVE_ORDER, data);
  // }
  

  save(data: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(this.SAVE_ORDER, data)
      .pipe(map((data: Customer) => data));
  }

  // saveOrder(data: OrderMasterModel): Observable<OrderMasterModel> {
  //   return this.http
  //     .post<OrderMasterModel>(this.SAVE_ORDER, data)
  //     .pipe(map((data: OrderMasterModel) => data));
  // }

  update(data: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(this.UPDATE_ORDER, data)
      .pipe(map((data: Customer) => data));
  }

  findOrderlist(data) {
    const params = new HttpParams().append('id', data); 
    return this.http.get(this.FIND_BY_ID_ORDER, { params }).pipe(
      map((data: any) => data.items
      ));
  }

  checkOrderID(orderId: any) {
    return this.http.get<any>(`${this.FIND_BY_ID_ORDER}`, {
      params: new HttpParams().set('orderId', orderId)
    })
  }

  findDetailslistByid(data) {
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND_DETAILS_BY_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }


}
