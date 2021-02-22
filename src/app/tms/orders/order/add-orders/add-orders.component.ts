import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Customer } from '../../../customer/customer.model';
import { CustomerService } from '../../../customer/customer.service';
import { OrderModel } from '../../../model/order.Model';
import { OrderAccountDetails } from '../../../model/orderAccountDetails.Model';
import { OrderDetailsModel } from '../../../model/orderDetails.Model';
 
import { StockGroup } from '../../../model/stockGroup.Model';
import { CategoryModel } from '../../../setting/model/category.Model';
import { ItemEntity } from '../../../setting/model/itemEntity.Model';
import { MeasurementModel } from '../../../setting/model/measurement.Model';
import { SubCategoryModel } from '../../../setting/model/subCategory.Model';
import { SettingService } from '../../../setting/service/setting.service';
import { OrderService } from '../service/order.service';
 

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  
  
  onClose: Subject<boolean>;
  purchaseDetailList: any[]=new Array();
   
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

  itemEntityModel: ItemEntity = new ItemEntity();
  itemModelId=  [];
  itemModelId2: any[]= new Array();
  
  orderModelList: OrderModel[];
  orderAccountDetailsList: any[]= new Array();

  itemTotal: any;

  isReadOnly: boolean =false;

  maxDate: Date = new Date();
  id=0;
  grandTotal:number = 0.00;
  designModel: any;
  sendData: any;
  customerCode: any;
  itemId: any;
  orderid: any;
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


    if (this.sendData) {
      
      this.orderModel = this.sendData;
      this.customerCode = this.orderModel.customerCode;
      this.orderid = this.orderModel.orderNo;
      console.log("this.orderid",this.orderid); 

      this.getCustomerInfo(this.customerCode);
      // this.getMesurmentInfo(this.orderModel.orderNo);
      this.getAccountInfo(this.orderModel.orderNo);
     
    }
  }



  getCustomerInfo(id){
    this.customerService.checkCustomerID(id).subscribe(data=>{
    this.customer= data.obj;
      console.log("this.customer",this.customer); 
    
    })
  }
  getMesurmentInfo(orderNo){
    this.apiService.findMesurementByOrderid(orderNo).subscribe(data=>{
      console.log("this.mesurementList",data); 
    
      this.orderDetailsModellist = data;
    this.mesurementList = data;
      // this.customer= data.obj;
      console.log("this.mesurementList",this.orderDetailsModellist); 
      console.log("this.mesurementList",this.mesurementList); 
    
    })
  }

  getAccountInfo(orderNo){
    this.apiService.findAccountInfoByOrderid(orderNo).subscribe(data=>{
     
     this.orderAccountDetailsList= data;
    //  this.orderAccountDetailsList = this.orderAccountDetailsList;
    this.getGrandTotal();
     for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
      this.orderAccountDetails = this.orderAccountDetailsList[i];
        
      this.apiService.findAccountInfoByOrderidandItemId(this.orderAccountDetails).subscribe(data=>{
         
          
          this.orderAccountDetailsList[i].ordermeasurementList =data["items"];

        });

     }
      // console.log(" this.orderAccountDetailsList",this.orderModel); 
     
    
    })
  }


  getmesurementList(itemId):any{
    console.log(itemId); 
    
    
    this.apiService.getMesurementlistByItemId(itemId).subscribe(data=>{
      this.mesurementList= data;
      // console.log(this.mesurementList); 
    
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
    this.orderAccountDetails.itemId =getItem.itemId;
    this.orderAccountDetails.itemName = getItem.itemName;
    this.getTotal();

    this.getmesurementList(getItem.itemId);
  }
 
  editData(entity, s) {
    
    for (let i = 0; i < entity.ordermeasurementList.length; i++) {
      entity.ordermeasurementList[i].id= entity.ordermeasurementList[i].measurementId;
      
    }
    
    this.mesurementList= entity.ordermeasurementList;
    this.itemId = entity.itemId;
    var splitted = entity.designModel.split(",");
    this.itemModelId2= splitted;
    let a=[];
    for (let i = 0; i < this.itemModelId2.length; i++) {
        let b= (Number(this.itemModelId2[i]));
        a[i]= b;
      
    }

    this.itemModelId= a;

    this.orderAccountDetails.itemRate = entity.itemRate;
    this.orderAccountDetails.qty = entity.qty;
    console.log("this.itemModelId",this.itemModelId);

    console.log("entity.ordermeasurementList",entity.ordermeasurementList);
    // this.orderAccountDetails.designModel= this.designModel;
    // this.itemModelId = entity.designModel;

    console.log(entity.ordermeasurementList); 
   
    
  }


  deleteitem(id) {
    for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
     
      if(i==id){
        this.orderAccountDetailsList.splice(i,1);
        this.getGrandTotal();
        return;
      }

    }
  }

  getTotal():any{

    // this.orderAccountDetails.itemTotalAmount = this.orderAccountDetails.itemRate* this.orderAccountDetails.qty;
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
        this.orderModel.customerCode = customer.customerCode;
        
       
    }
  }

addod(){
    console.log(this.orderAccountDetails);


    // this.orderAccountDetailsList

    for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
      if(this.orderAccountDetailsList[i].itemId== this.orderAccountDetails.itemId){
        this.toastr.warning('Duplicate Item can not be added');
        return;
      }

}

    this.designModel="";
    if(this.itemModelId){
      for (let index = 0; index < this.itemModelId.length;) {
        this.designModel += this.itemModelId[index];

        index++;
        if(index !=this.itemModelId.length){

          this.designModel +=  ",";
        }
      }
    }
    var plist = [];

    for (let i = 0; i < this.mesurementList.length; i++) {
      this.mesurementList[i].id= this.mesurementList[i].measurementId; 
    }

    plist = this.mesurementList;

    this.orderAccountDetails.ordermeasurementList = plist;

      // this.orderModel.designModel= this.designModel;

      // console.log("this.orderModel",this.orderModel);
      this.id += 1;
      this.orderAccountDetails.id = this.id;
      this.orderAccountDetails.designModel= this.designModel;
      console.log("this.orderAccountDetails",this.orderAccountDetails);
    this.orderAccountDetailsList.push(this.orderAccountDetails);


      this.getGrandTotal();
      
      this.reset();
  }


  submitOrder(): any{

    if(this.orderid){
    this.orderModel.orderAccountDetailsList = this.orderAccountDetailsList;
    
    this.orderModel.totalAmount = this.grandTotal;
    console.log('Update ', this.orderModel);

    this.apiService.updateOrder(this.orderModel).subscribe(
      (resp) => {
        console.log('Update ', resp);
        if (resp) {
          
           this.toastr.success('', 'Update Successfull');
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
    }else{
      this.getGrandTotal();

      this.orderModel.orderAccountDetailsList = this.orderAccountDetailsList;
      this.orderModel.totalAmount = this.grandTotal;
  
      this.apiService.saveOrder(this.orderModel).subscribe(
        (resp) => {
          console.log('create ', resp);
          if (resp) {
            
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

  }



  getGrandTotal():any{
    this.grandTotal=0;
    console.log("addorder", this.orderAccountDetailsList);
    this.orderAccountDetailsList.forEach(element => {
      this.grandTotal += element.qty*element.itemRate;
      //this.getVatamount();
    });  
  
  }
  reset() {
    this.designModel= "";
    this.itemModelId=[];
    this.mesurementList = [];
    this.orderAccountDetails =new OrderAccountDetails();
    // this.model = new OrderDetailsModel();
    //  this.l4Code ="";
    //  this.qty="";
    //  this.productName="";
    // this.rate = 0;
  }

  createOrder(form: NgForm): void {
   
    // this.orderModel.customerCode = this.customer.cusId;
    // this.orderModel.totalAmount = this.orderAccountDetails.itemTotalAmount;

      // if(this.mesurementList.length>0){
      //   this.orderModel.ordermeasurementList= this.mesurementList;
      // }
      // this.orderModel.orderAccountDetails= this.orderAccountDetails;
      // var designModel= "";
      // if(this.itemModelId){
      //   for (let index = 0; index < this.itemModelId.length;) {
      //     designModel += this.itemModelId[index];
      //     index++;
      //     if(index !=this.itemModelId.length){

      //       designModel +=  ",";
      //     }
      //   }
      // }
      // var plist = [];
      // plist = this.mesurementList;
      // this.orderAccountDetails.ordermeasurementList = plist;
      

      //   this.orderModel.designModel= designModel;

      //   console.log(this.orderAccountDetails);
      //   console.log(this.orderAccountDetailsList);

      //   this.id += 1;
      //   this.orderAccountDetails.id = this.id;
   
      // this.orderAccountDetailsList.push(this.orderAccountDetails);
      // this.orderAccountDetailsList.
      
      

    

    // console.log(this.orderModel); // print room obj
    // this.orderModel.ssCreator= this.token.getUsername();
    
     
    // this.apiService.saveOrder(this.orderModel).subscribe(
    //   (resp) => {
    //     console.log('create ', resp);
    //     if (resp) {
    //       form.resetForm();
    //        this.toastr.success('', 'Create Successfull');
    //       this.onClose.next(true);
    //       this.bsModalRef.hide();
    //     } else {
    //        this.toastr.success('', "Something  wrong");
    //     }
    //   },
    //   (err) => {
    //      this.toastr.warning('', "There have an error");
    //   }
    // );
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
