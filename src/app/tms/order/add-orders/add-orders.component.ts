import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Customer } from '../../customer/customer.model';
import { CustomerService } from '../../customer/customer.service';
import { OrderModel } from '../../model/order.Model';
import { OrderAccountDetails } from '../../model/orderAccountDetails.Model';
import { OrderDetailsModel } from '../../model/orderDetails.Model';
 
import { StockGroup } from '../../model/stockGroup.Model';
import { CategoryModel } from '../../setting/model/category.Model';
import { ItemEntity } from '../../setting/model/itemEntity.Model';
import { MeasurementModel } from '../../setting/model/measurement.Model';
import { SubCategoryModel } from '../../setting/model/subCategory.Model';
import { SettingService } from '../../setting/service/setting.service';
import { OrderService } from '../service/order.service';
 

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  
  
  onClose: Subject<boolean>;
  purchaseDetailList: any[]=new Array();
  grandTotal= 0;
  groupList: StockGroup[];
  groupName: any;
  dtOptions: DataTables.Settings = {};
  orderDate   : Date = new Date();
  mesurementList: MeasurementModel[];
  catList: CategoryModel[];
  subcatList: SubCategoryModel[];
  itemEntityList: ItemEntity[];
  customerList: Customer[];
  selected: any[]=new Array();
  orderModel: OrderModel= new OrderModel();
  customer: Customer= new Customer();
  orderDetailsModellist: OrderDetailsModel[];
  orderDetails: OrderDetailsModel= new OrderDetailsModel();

  orderDetailsModel: OrderDetailsModel = new OrderDetailsModel();
  orderAccountDetails: OrderAccountDetails= new OrderAccountDetails();

  itemTotal: any;

  isReadOnly: boolean =false;

  maxDate: Date = new Date();

  constructor(
    
    public bsModalRef: BsModalRef,
    public apiService: OrderService,
    public settingService: SettingService,
    public customerService: CustomerService,
    public toastr: ToastrService,
  ) { }


  ngOnInit(): void {

    this.onClose = new Subject();
    // this.getgList();   
    this.getCatList();
    this.getItemList();
    this. getItemModelList();
    this.getCustomerList();

    // this.getProdoneList();
  }

  getmesurementList(itemId):any{
    console.log(itemId); 
    
    
    this.apiService.getMesurementlistByItemId(itemId).subscribe(data=>{
      this.mesurementList= data;
      console.log(this.mesurementList); 
    
    })


    }


    getCustomerList(){
      this.customerService.getCustomerList().subscribe((data)=>{
        
        this.customerList= data['data'];
        console.log(this.customerList); 
      })
      }
      getCatList(){
        this.settingService.getCatList().subscribe((data)=>{
          
          this.catList= data['data'];
          console.log(this.catList); 
        })
        }

    getItemList(){
      this.settingService.getSubCatList().subscribe((data)=>{
        
        this.subcatList= data['data'];
        console.log(this.subcatList); 
      })
      }

      getItemModelList(){
        this.settingService.getSubItemModel().subscribe((data)=>{
          
          this.itemEntityList= data['data'];
          console.log(this.itemEntityList); 
        })
        }
    

  getgList() {
    // this.apiService.getProductGList().subscribe((data) => {
    //   console.log(data);
    //   // this.groupList = JSON.parse(data.results);
    //   // this.groupList= data['results'];
    //   // console.log(this.groupList);
    //   // console.log(this.prodOneList)
    // })
  }
  getProdoneList(){
    // this.productService.getProductList().subscribe((data)=>{
      
    //   this.productList= data['data'];
    // })
    }

  
  onSaveOrUpdate(form: NgForm) {

    
    if(this.orderModel.orderNo){
      // this.updateSupplier(form);
    } else {
      console.log("CREATE",form);
      this.createOrder(form);
    } 
  }

  selectL1Item(getItem):any{  
    console.log(getItem); 
    this.orderAccountDetails.itemRate= getItem.itemAmount;
    this.orderAccountDetails.itemsCode =getItem.itemId;
    this.getTotal();

    this.getmesurementList(getItem.itemId);
  
  }
 

  getTotal():any{

    this.orderAccountDetails.itemTotalAmount = this.orderAccountDetails.itemRate* this.orderAccountDetails.qty;
  }

  selectCategory(category):any{
    console.log(category); 
    this.settingService.findByCategoryid(category.categoryId).subscribe(data=>{
      this.subcatList= data;
       
    })

  }


  selectCustomer(customer):any{  
    console.log(customer); 
    this.customer = customer;

    if(customer !=null){
        this.orderModel.customerCode = customer.cusId;
        
       
    }
  }


  createOrder(form: NgForm): void {

    this.orderModel.customerCode = this.customer.cusId;
    this.orderModel.totalAmount = this.orderAccountDetails.itemTotalAmount;

      if(this.mesurementList.length>0){
        this.orderModel.ordermeasurementList= this.mesurementList;
      }
      this.orderModel.orderAccountDetails= this.orderAccountDetails;

      this.orderModel.designModel= this.orderModel.designModel;

    

    console.log(this.orderModel); // print room obj
    // this.orderModel.ssCreator= this.token.getUsername();
    
     
    this.apiService.saveOrder(this.orderModel).subscribe(
      (resp) => {
        console.log('create ', resp);
        if (resp) {
          form.resetForm();
           this.toastr.success('', 'Create Successfull');
          this.onClose.next(true);
          this.bsModalRef.hide();
        } else {
           this.toastr.success('', "Something  wrong");
        }
      },
      (err) => {
         this.toastr.warning('', "There have an error");
      }
    );
  }

  // updateSupplier(form: NgForm): void {
  //   console.log(this.supplier); // print room obj
  //   this.supplier.ssModifier= this.token.getUsername();
  
  //   this.apiService.updateSupplier(this.supplier).subscribe(
  //     (resp) => {
  //       console.log('update ', resp);
  //       if (resp) {
  //         form.resetForm();
  //         this.toastr.success('', 'Update Successfull');
  //         this.onClose.next(true);
  //         this.bsModalRef.hide();
  //       } else {
  //          this.toastr.warning('', "Something wrong");
  //       }
  //     },
  //     (err) => {
  //       this.toastr.warning('', 'Error occured');
  //     }
  //   );
  // }

}
