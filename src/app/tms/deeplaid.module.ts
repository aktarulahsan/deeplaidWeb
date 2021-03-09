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
import { DeliveryComponent } from './orders/completed/delivery/delivery.component';
import { IncomplitedComponent } from './orders/incomplited/incomplited.component';
import { CompletedComponent } from './orders/completed/completed.component';
import { DeliveredOrderComponent } from './orders/delivered-order/delivered-order.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { OrderComponent } from './orders/order/order.component';
import { AddOrdersComponent } from './orders/order/add-orders/add-orders.component';
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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ItemModelComponent } from './setting/item-model/item-model.component';
import { AddItemModelComponent } from './setting/item-model/add-item-model/add-item-model.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { PaymentPendingComponent } from './payment-pending/payment-pending.component';
 
import { EmployeeComponent } from './employee/employee.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DesignCategoryComponent } from './setting/design-category/design-category.component';
import { DesignSubCategoryComponent } from './setting/design-sub-category/design-sub-category.component';
import { AddDesignCategoryComponent } from './setting/design-category/add-design-category/add-design-category.component';
import { AddDesignSubCategoryComponent } from './setting/design-sub-category/add-design-sub-category/add-design-sub-category.component';
import { OrderDetailsComponent } from './orders/order/order-details/order-details.component';
@NgModule({
  declarations: [DeeplaidComponent,
     HomePageComponent, AddorderComponent,
      AddordersComponent, CustomerComponent,
       SettingComponent, 
        DeliveryComponent, IncomplitedComponent,
         CompletedComponent, DeliveredOrderComponent,
          AddCustomerComponent, OrderComponent, 
          AddOrdersComponent, AddcategoryComponent, AddSubCatComponent, CategoryComponent, SubCategoryComponent, MeasurementComponent, AddMesurementComponent, ItemModelComponent, AddItemModelComponent, CustomerDetailsComponent, PaymentPendingComponent, AccountsComponent, EmployeeComponent, OrdersComponent, DesignCategoryComponent, DesignSubCategoryComponent, AddDesignCategoryComponent, AddDesignSubCategoryComponent, OrderDetailsComponent],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    DataTablesModule,
    ModalModule.forRoot(),
    NgSelectModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()
    
  ]
})
export class DeeplaidModule { }
providers: [
  
  BsModalRef,

]
