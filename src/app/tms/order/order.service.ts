import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient, private http: HttpClient
  ) { }

  private SUPPLIER_END_POINT = `supplier`;


  private SAVE_SUPPLIER= `${environment.baseUrl}${environment.orderApiUrl}/${this.SUPPLIER_END_POINT}/create`;
  private UPDATE_SUPPLIER = `${environment.baseUrl}${environment.orderApiUrl}/${this.SUPPLIER_END_POINT}/update`;
  private  SUPPLIER_LIST = `${environment.baseUrl}${environment.orderApiUrl}/${this.SUPPLIER_END_POINT}/list`;
  private FIND_BY_ID_SUPPLIER = `${environment.baseUrl}${environment.orderApiUrl}/${this.SUPPLIER_END_POINT}/findById`;



  private END_POINT = `measurement`;

  private FIND_DETAILS_BY_ITEM_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findDetailsById`;
  

  // getsupplierList(): Observable<any> {
  //   // return this.http.get(`${this.SUPPLIER_LIST}`);
  // }
  // saveSupplier(data: SupplierModel): Observable<SupplierModel> {
  //   // return this.http
  //   //   .post<SupplierModel>(this.SAVE_SUPPLIER, data)
  //   //   .pipe(map((data: SupplierModel) => data));
  // }
  // updateSupplier(data: SupplierModel): Observable<SupplierModel> {
  //   // return this.http
  //   //   .put<SupplierModel>(this.UPDATE_SUPPLIER, data)
  //   //   .pipe(map((data: SupplierModel) => data));
  // }

  // findsupplierlist(data) {
  //   // const params = new HttpParams().append('id', data); 
  //   // return this.http.get(this.FIND_BY_ID_SUPPLIER, { params }).pipe(
  //   //   map((data: any) => data.items
  //   //   ));
  // }


  getMesurementlistByItemId(data) {
    const params = new HttpParams().append('itemId', data); 
    return this.http.get(this.FIND_DETAILS_BY_ITEM_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }

  // findOrderlist(data) {
  //   const params = new HttpParams().append('id', data); 
  //   return this.http.get(this.FIND_BY_ID_ORDER, { params }).pipe(
  //     map((data: any) => data.items
  //     ));
  // }

}