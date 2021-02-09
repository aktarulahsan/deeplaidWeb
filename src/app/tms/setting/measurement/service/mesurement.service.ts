import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../../model/category.Model';
import { MeasurementModel } from '../../model/measurement.Model';
import { SubCategoryModel } from '../../model/subCategory.Model';

@Injectable({
  providedIn: 'root'
})
export class MesurementService {

  constructor(
    private httpClient: HttpClient, private http: HttpClient
  ) { }
  
  private END_POINT = `measurement`;
 

  private SAVE= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/create`;
  private UPDATE = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/update`;
  private  LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/list`;
  private FIND_BY_ID= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findById`;
  private FIND_DETAILS_BY_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findDetailsById`;

 

  getmesurmentList(): Observable<any> {
    return this.http.get(`${this.LIST}`);
  }
 
  savemesurment(data: MeasurementModel): Observable<MeasurementModel> {
    return this.http
      .post<MeasurementModel>(this.SAVE, data)
      .pipe(map((data: MeasurementModel) => data));
  }

  
  updatemesurment(data: MeasurementModel): Observable<MeasurementModel> {
    return this.http
      .put<MeasurementModel>(this.UPDATE, data)
      .pipe(map((data: MeasurementModel) => data));
  }

  findmesurmentlist(data) {
    const params = new HttpParams().append('id', data); 
    return this.http.get(this.FIND_BY_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }

  checkmesurmentId(categoryId: any) {
    return this.http.get<any>(`${this.FIND_BY_ID}`, {
      params: new HttpParams().set('categoryId', categoryId)
    })
  }

  findDetailslistByid(data) {
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND_DETAILS_BY_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }

 


}