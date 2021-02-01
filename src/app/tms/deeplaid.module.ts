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

@NgModule({
  declarations: [DeeplaidComponent,
     HomePageComponent, AddorderComponent,
      AddordersComponent, CustomerComponent,
       SettingComponent, 
        DeliveryComponent, IncomplitedComponent,
         CompletedComponent, DeliveredOrderComponent,
          AddCustomerComponent, OrderComponent, 
          AddOrdersComponent],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    DataTablesModule,
    ModalModule.forRoot(),
    NgSelectModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    
  ]
})
export class DeeplaidModule { }
providers: [
  
  BsModalRef,

]
