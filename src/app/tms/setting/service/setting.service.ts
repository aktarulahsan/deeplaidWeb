import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Customer } from '../../customer/customer.model';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../model/category.Model';
import { SubCategoryModel } from '../model/subCategory.Model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private httpClient: HttpClient, private http: HttpClient
  ) { }
  
  private END_POINT = `category`;
  private END_POINT2 = `category`;

  private SAVE_CAT= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/create`;
  private UPDATE_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/update`;
  private  CAT_LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/list`;
  private FIND_BY_ID_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findById`;
  private FIND_DETAILS_BY_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findDetailsById`;


  private SAVE_SUB_CAT= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT2}/create`;
  private UPDATE_SUB_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT2}/update`;


  getCatList(): Observable<any> {
    return this.http.get(`${this.CAT_LIST}`);
  }
 
  saveCat(data: CategoryModel): Observable<CategoryModel> {
    return this.http
      .post<CategoryModel>(this.SAVE_CAT, data)
      .pipe(map((data: CategoryModel) => data));
  }

  
  updateCat(data: CategoryModel): Observable<CategoryModel> {
    return this.http
      .put<CategoryModel>(this.UPDATE_CAT, data)
      .pipe(map((data: CategoryModel) => data));
  }

  findCATlist(data) {
    const params = new HttpParams().append('id', data); 
    return this.http.get(this.FIND_BY_ID_CAT, { params }).pipe(
      map((data: any) => data.items
      ));
  }

  checkCatId(categoryId: any) {
    return this.http.get<any>(`${this.FIND_BY_ID_CAT}`, {
      params: new HttpParams().set('categoryId', categoryId)
    })
  }

  findDetailslistByid(data) {
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND_DETAILS_BY_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }


  saveSubCat(data: SubCategoryModel): Observable<SubCategoryModel> {
    return this.http
      .post<SubCategoryModel>(this.SAVE_SUB_CAT, data)
      .pipe(map((data: SubCategoryModel) => data));
  }

  
  updateSubCat(data: SubCategoryModel): Observable<SubCategoryModel> {
    return this.http
      .put<SubCategoryModel>(this.UPDATE_SUB_CAT, data)
      .pipe(map((data: SubCategoryModel) => data));
  }

  

}