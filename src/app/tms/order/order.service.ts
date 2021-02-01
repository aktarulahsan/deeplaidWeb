import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}