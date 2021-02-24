import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
 
import { map } from 'rxjs/operators';
import { CategoryModel } from '../model/category.Model';
import { SubCategoryModel } from '../model/subCategory.Model';
import { ItemEntity } from '../model/itemEntity.Model';
import { DesignCategoryModel } from '../model/designCategory.Model';
import { DesignSubCategoryModel } from '../model/desingSubCategory.Model';
 

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private httpClient: HttpClient, private http: HttpClient
  ) { }
  
  private END_POINT = `category`; 
  private END_POINT2 = `subCategory`;
  private END_POINT3 = `itemModel`;

  private END_POINT4 = `designCategory`;
  private END_POINT5 = `designSubCategory`;

  private SAVE_CAT= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/create`;
  private UPDATE_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/update`;
  private  CAT_LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/list`;
  private FIND_BY_ID_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findById`;
  private FIND_DETAILS_BY_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findDetailsById`;
  private FIND__BY_ORDER_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT}/findByOrderId`;


  private SAVE_SUB_CAT= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT2}/create`;
  private UPDATE_SUB_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT2}/update`;
  private  SUB_CAT_LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT2}/list`;
  private FIND_BY_CAT_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT2}/findByCategoryId`;


  private SAVE_ITEM_MODEL= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT3}/create`;
  private UPDATE_ITEM_MODEL = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT3}/update`;
  private  SUB_ITEM_MODEL_LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT3}/list`;








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
 

  findMesurementByOrderid(data) {
    const params = new HttpParams().append('orderId', data); 
    return this.http.get(this.FIND__BY_ORDER_ID, { params }).pipe(
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


  getSubCatList(): Observable<any> {
    return this.http.get(`${this.SUB_CAT_LIST}`);
  }

  findByCategoryid(data) {
    const params = new HttpParams().append('categoryId', data); 
    return this.http.get(this.FIND_BY_CAT_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }
  
  



  saveItemModel(data: ItemEntity): Observable<ItemEntity> {
    return this.http
      .post<ItemEntity>(this.SAVE_ITEM_MODEL, data)
      .pipe(map((data: ItemEntity) => data));
  }

  
  updateItemModel(data: ItemEntity): Observable<ItemEntity> {
    return this.http
      .put<ItemEntity>(this.SUB_ITEM_MODEL_LIST, data)
      .pipe(map((data: ItemEntity) => data));
  }

  getSubItemModel(): Observable<any> {
    return this.http.get(`${this.SUB_ITEM_MODEL_LIST}`);
  }





  private SAVE_DESIGN_CAT= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT4}/create`;
  private UPDATE_DESIGN_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT4}/update`;
  private  DESIGN_LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT4}/list`;
  private FIND_BY_DESIGN_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT4}/findByCategoryId`;


  getDesignList(): Observable<any> {
    return this.http.get(`${this.DESIGN_LIST}`);
  }
 
  saveDesign(data: DesignCategoryModel): Observable<DesignCategoryModel> {
    return this.http
      .post<DesignCategoryModel>(this.SAVE_DESIGN_CAT, data)
      .pipe(map((data: DesignCategoryModel) => data));
  }

  
  updateDesign(data: DesignCategoryModel): Observable<DesignCategoryModel> {
    return this.http
      .put<DesignCategoryModel>(this.UPDATE_DESIGN_CAT, data)
      .pipe(map((data: DesignCategoryModel) => data));
  }

  findDesignlist(data) {
    const params = new HttpParams().append('id', data); 
    return this.http.get(this.FIND_BY_DESIGN_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }


  
  private SAVE_SUB_DESIGN_CAT= `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT5}/create`;
  private UPDATE_SUB_DESIGN_CAT = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT5}/update`;
  private  SUB_DESIGN_LIST = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT5}/list`;
  private FIND_BY_SUB_DESIGN_ID = `${environment.baseUrl}${environment.tmsApiUrl}/${this.END_POINT5}/findById`;


  getSubDesignList(): Observable<any> {
    return this.http.get(`${this.SUB_DESIGN_LIST}`);
  }
 
  saveSubDesign(data: DesignSubCategoryModel): Observable<DesignSubCategoryModel> {
    return this.http
      .post<DesignSubCategoryModel>(this.SAVE_SUB_DESIGN_CAT, data)
      .pipe(map((data: DesignSubCategoryModel) => data));
  }

  
  updateSubDesign(data: DesignSubCategoryModel): Observable<DesignSubCategoryModel> {
    return this.http
      .put<DesignSubCategoryModel>(this.UPDATE_SUB_DESIGN_CAT, data)
      .pipe(map((data: DesignSubCategoryModel) => data));
  }

  findSubDesignlist(data) {
    const params = new HttpParams().append('designCategoryId', data); 
    return this.http.get(this.FIND_BY_SUB_DESIGN_ID, { params }).pipe(
      map((data: any) => data.items
      ));
  }

}