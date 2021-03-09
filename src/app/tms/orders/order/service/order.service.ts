import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../../../model/baseresponse.model';
import { OrderModel } from '../../../model/order.Model';
import { OrderAccountDetails } from '../../../model/orderAccountDetails.Model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient, private http: HttpClient
  ) { }
  private END_POINT = `order`;
  private END_POINT2 = `measurement`;

  private SAVE_ORDER= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/create`;
  private UPDATE_ORDER = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/update`;
  private  ORDER_LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/list`;
  private FIND_BY_ID_ORDER = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findById`;
  private FIND_DETAILS_BY_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findDetailsById`;
  private FIND_MESUERMENT_BY_ITEM_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT2}/findDetailsById`;
  private FIND_BY_ORDER_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findMesurementByOrderid`;
  private FIND_ACCOUNT_INFO_BY_ORDER_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findAccountInfoByOrderid`;
  private FIND_ACCOUNT_INFO_BY_ORDER_ID_ITEMID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findAccountInfoByOrderidandItemId`;
   
  getOrderList(): Observable<any> {
    return this.http.get(`${this.ORDER_LIST}`);
  }
 
  // saveOrder(data: OrderModel): Observable<OrderModel> {
  //   return this.http
  //     .post<OrderModel>(this.SAVE_ORDER, data)
  //     .pipe(map((data: OrderModel) => data));
  // }

  saveOrder(data: OrderModel): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(this.SAVE_ORDER, data);
  }
  

  
  updateOrder(data: OrderModel): Observable<OrderModel> {
    return this.http
      .put<OrderModel>(this.UPDATE_ORDER, data)
      .pipe(map((data: OrderModel) => data));
  }

  findOrderlist(data) {
    const params = new HttpParams().append('id', data); 
    return this.http.get(this.FIND_BY_ID_ORDER, { params }).pipe(
      map((data: any) => data.items
      ));
  }

  getMesurementlistByItemId(data) {
    const params = new HttpParams().append('itemId', data); 
    return this.http.get(this.FIND_MESUERMENT_BY_ITEM_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }

  findMesurementByOrderid(data) {
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND_BY_ORDER_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }
  // findMesurementByOrderidandItemid(data) {
  //   const params = new HttpParams().append('orderId', data); 
  //   return this.http.get(this.FIND_ACCOUNT_INFO_BY_ORDER_ID_ITEMID, { params }).pipe(
  //     map((data: any) => data.items
  //     ));
  // }

  findAccountInfoByOrderid(data) {
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND_ACCOUNT_INFO_BY_ORDER_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }

  findAccountInfoByOrderidandItemId(data: OrderAccountDetails): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(this.FIND_ACCOUNT_INFO_BY_ORDER_ID_ITEMID, data);
  }

  findOrderByid(data){
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND_BY_ID_ORDER, { params }).pipe(
      map((data: any) => data.obj
      ));

  }



}
