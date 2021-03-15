 

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

  private CUSTOMER_END_POINT = `customer`;

  private SAVE_CUSTOMER= `${environment.baseUrl}${environment.orderApiUrl}/${this.CUSTOMER_END_POINT}/create`;
  private UPDATE_CUSTOMER = `${environment.baseUrl}${environment.orderApiUrl}/${this.CUSTOMER_END_POINT}/update`;
  private  CUSTOMER_LIST = `${environment.baseUrl}${environment.orderApiUrl}/${this.CUSTOMER_END_POINT}/list`;
  private FIND_BY_ID_CUSTOMER = `${environment.baseUrl}${environment.orderApiUrl}/${this.CUSTOMER_END_POINT}/findById`;
  private FIND_BY_ID_MOBILE = `${environment.baseUrl}${environment.orderApiUrl}/${this.CUSTOMER_END_POINT}/findByMobile`;
  private FIND_DETAILS_BY_ID = `${environment.baseUrl}${environment.orderApiUrl}/${this.CUSTOMER_END_POINT}/findDetailsById`;


  private ORDER_REPORT = `${environment.baseUrl}report/rolereport`;


  getCustomerList(): Observable<any> {
    return this.http.get(`${this.CUSTOMER_LIST}`);
  }
  
  // save(data: Customer): Observable<Customer> {
  //   return this.http
  //     .post<Customer>(this.SAVE_ORDER, data);
  // }
  

  save(data: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(this.SAVE_CUSTOMER, data)
      .pipe(map((data: Customer) => data));
  }
  savecustomer(data: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(this.SAVE_CUSTOMER, data)
      .pipe(
        map((data: any) => data.obj
        ));
  }

  // saveOrder(data: OrderMasterModel): Observable<OrderMasterModel> {
  //   return this.http
  //     .post<OrderMasterModel>(this.SAVE_ORDER, data)
  //     .pipe(map((data: OrderMasterModel) => data));
  // }

  update(data: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(this.UPDATE_CUSTOMER, data)
      .pipe(map((data: Customer) => data));
  }

  // findCustomerbyMobile(data) {
  //   const params = new HttpParams().append('mobile', data); 
  //   return this.http.get(this.FIND_BY_ID_CUSTOMER, { params }).pipe(
  //     map((data: any) => data.items
  //     ));
  // }

  findCustomerbyMobile(labNo: any) {
    return this.http.get<any>(`${this.FIND_BY_ID_MOBILE}`, {
      params: new HttpParams().set('mobile', labNo)
    })
  }

  checkCustomerID(id: any) {
    return this.http.get<any>(`${this.FIND_BY_ID_CUSTOMER}`, {
      params: new HttpParams().set('customerCode', id)
    })
  }

  findDetailslistByid(data) {
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND_DETAILS_BY_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }


  viewReportRole(): Observable<any> {
    return this.http.get(`${this.ORDER_REPORT}`);
  }


  generateCertificate(data) {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.ORDER_REPORT, data, httpOptions); 
}



}
