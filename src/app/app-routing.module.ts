import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginComponent } from './login/login.component';
import { AccountsComponent } from './tms/accounts/accounts.component';
import { AddorderComponent } from './tms/addorder/addorder.component';
import { CompletedComponent } from './tms/completed/completed.component';
import { CustomerDetailsComponent } from './tms/customer/customer-details/customer-details.component';
import { CustomerComponent } from './tms/customer/customer.component';
import { DeeplaidComponent } from './tms/deeplaid.component';
import { DeliveredOrderComponent } from './tms/delivered-order/delivered-order.component';
import { EmployeeComponent } from './tms/employee/employee.component';
import { HomePageComponent } from './tms/home-page/home-page.component';
import { IncomplitedComponent } from './tms/incomplited/incomplited.component';
import { OrderComponent } from './tms/order/order.component';
import { OrdersComponent } from './tms/orders/orders.component';
import { PaymentPendingComponent } from './tms/payment-pending/payment-pending.component';
import { CategoryComponent } from './tms/setting/category/category.component';
import { MeasurementComponent } from './tms/setting/measurement/measurement.component';
import { SettingComponent } from './tms/setting/setting.component';
import { SubCategoryComponent } from './tms/setting/sub-category/sub-category.component';
 

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: DeeplaidComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'addorder',
        component: AddorderComponent,
     
      },
      {
        path: 'customer',
        component: CustomerComponent,
     
      },
      {
        path: 'setting',
        component: SettingComponent,
     
      },
      
      

      {
        path: 'incomplete',
        component: IncomplitedComponent,
     
      },
      {
        path: 'completed',
        component: CompletedComponent,
     
      },
      {
        path: 'deliveredorder',
        component: DeliveredOrderComponent,
     
      },
      // {
      //   path: 'order',
      //   component: OrderComponent,
     
      // },

      {
        path: 'category',
        component: CategoryComponent,
     
      },
      {
        path: 'subCategory',
        component: SubCategoryComponent,
     
      },
      
      {
        path: 'measurement',
        component: MeasurementComponent,
     
      },
      {
        path: 'customerDetails',
        component: CustomerDetailsComponent,
     
      },

      {
        path: 'paymentPending',
        component: PaymentPendingComponent,
     
      },
      {
        path: 'accounts ',
        component: AccountsComponent,
     
      },
      {
        path: 'employee',
        component: EmployeeComponent,
     
      },
      {
        path: 'order',
        component: OrdersComponent,
     
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginPageComponent, HomePageComponent];