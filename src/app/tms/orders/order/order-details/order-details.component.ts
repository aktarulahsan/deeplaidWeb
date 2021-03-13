import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
 
import { Customer } from 'src/app/tms/customer/customer.model';
import { CustomerService } from 'src/app/tms/customer/customer.service';
import { OrderModel } from 'src/app/tms/model/order.Model';
import { OrderAccountDetails } from 'src/app/tms/model/orderAccountDetails.Model';
import { OrderDesignDetaislModel } from 'src/app/tms/model/orderDesignDetaisl.Model';
import { OrderDetailsModel } from 'src/app/tms/model/orderDetails.Model';
import { OrderDetailsModels } from 'src/app/tms/model/orderDetailsModel.Model';
import { OrderViewModel } from 'src/app/tms/model/orderView.Model';
import { MeasurementModel } from 'src/app/tms/setting/model/measurement.Model';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  customerList: Customer[];
  customer: Customer= new Customer();
 
  orderDetailsModels: OrderDetailsModels = new OrderDetailsModels();

  orderDetailsModellist: OrderDetailsModel[];
  orderModelList: OrderModel[];
  orderAccountDetailsList: any[]= new Array();
  orderDesignDetaislModelList: OrderDesignDetaislModel[]=new Array();
  orderDesignDetaislModel: OrderDesignDetaislModel= new OrderDesignDetaislModel();
  orderModel: OrderModel= new OrderModel();
  orderAccountDetails: OrderAccountDetails= new OrderAccountDetails();
  orderViewModelList: OrderViewModel[] = new Array();

  sendData:any;
  customerCode: any;
  orderid: any;
  mesurementList: MeasurementModel[];
  constructor(
    public route: ActivatedRoute,
    public apiService: OrderService,
    public customerService: CustomerService,
  ) { }

  ngOnInit(): void {
   
    this.customerCode= this.route.snapshot.paramMap.get('customerCode');
    this.orderid= this.route.snapshot.paramMap.get('orderNo');
    console.log(" ssssssssssssssss",this.customerCode); 
    console.log(" ssssssssssssssss",this.orderid); 
    
    
    if(this.customerCode){
      this.getCustomerInfo(this.customerCode);
      this.getAccountInfo(this.orderid);
      // this.getOrderMaster(this.orderid);
    }
  }
  getCustomerInfo(id){
    this.customerService.checkCustomerID(id).subscribe(data=>{
    this.customer= data.obj;
      console.log("this.customer",this.customer); 
    
    })
  }
  getOrderMaster(orderNo){
    this.apiService.findOrderByid(orderNo).subscribe(data=>{

      this.orderModel= data;
      console.log("this.sssssssssssssssssssssssssssssssssssssss",data); 
       
      
     
     })

  }

  getAccountInfo(orderNo){
    this.apiService.findOrderidview(orderNo).subscribe(data=>{
      console.log("this.fffffffffffsssssssssssssss",data); 
        this.orderViewModelList = data

    })
    
    // this.apiService.findAccountInfoByOrderid(orderNo).subscribe(data=>{

    //  this.orderAccountDetailsList= data;
     
    //  this.orderModel.orderAccountDetailsList = this.orderAccountDetailsList;
    //  for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
    //   this.orderAccountDetails = this.orderAccountDetailsList[i];
        
    //   this.apiService.findAccountInfoByOrderidandItemId(this.orderAccountDetails).subscribe(data=>{
         
          
    //       this.orderAccountDetailsList[i].ordermeasurementList =data["items"];

    //     });

    //  }
    //   console.log(" this.orderAccountDetailsList",this.orderDetailsModellist); 
     
    
    // })
  }
  trackItem (index, item) {
    return this.mesurementList ? this.mesurementList : undefined;   }

     

    trackByFn(index, item:any) { 

      return item.id; 
    }

}
