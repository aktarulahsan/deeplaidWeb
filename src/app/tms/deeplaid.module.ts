import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeeplaidComponent } from './deeplaid.component';
import { HomePageComponent } from './home-page/home-page.component';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { AddorderComponent } from './addorder/addorder.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { AddordersComponent } from './addorders/addorders.component';
import { CustomerComponent } from './customer/customer.component';
import { SettingComponent } from './setting/setting.component';
import { DeliveryComponent } from './completed/delivery/delivery.component';
import { IncomplitedComponent } from './incomplited/incomplited.component';
import { CompletedComponent } from './completed/completed.component';
import { DeliveredOrderComponent } from './delivered-order/delivered-order.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { OrderComponent } from './order/order.component';
import { AddOrdersComponent } from './order/add-orders/add-orders.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddcategoryComponent } from './setting/category/addcategory/addcategory.component';
import { AddSubCatComponent } from './setting/sub-category/add-sub-cat/add-sub-cat.component';
import { CategoryComponent } from './setting/category/category.component';
import { SubCategoryComponent } from './setting/sub-category/sub-category.component';
import { MeasurementComponent } from './setting/measurement/measurement.component';
import { AddMesurementComponent } from './setting/measurement/add-mesurement/add-mesurement.component';
// import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [DeeplaidComponent,
     HomePageComponent, AddorderComponent,
      AddordersComponent, CustomerComponent,
       SettingComponent, 
        DeliveryComponent, IncomplitedComponent,
         CompletedComponent, DeliveredOrderComponent,
          AddCustomerComponent, OrderComponent, 
          AddOrdersComponent, AddcategoryComponent, AddSubCatComponent, CategoryComponent, SubCategoryComponent, MeasurementComponent, AddMesurementComponent],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    DataTablesModule,
    ModalModule.forRoot(),
    NgSelectModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    BsDatepickerModule,
    
  ]
})
export class DeeplaidModule { }
providers: [
  
  BsModalRef,

]
