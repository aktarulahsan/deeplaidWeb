import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
 
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { OrderDesignDetaislModel } from 'src/app/tms/model/orderDesignDetaisl.Model';
import { OrderDetailsModels } from 'src/app/tms/model/orderDetailsModel.Model';
import { DesignCategoryModel } from 'src/app/tms/setting/model/designCategory.Model';
import { DesignSubCategoryModel } from 'src/app/tms/setting/model/desingSubCategory.Model';
 
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
import * as moment from 'moment';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  name = 'Angular Html To Pdf ';
  userName: string;
 
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  
  onClose: Subject<boolean>;
  purchaseDetailList: any[]=new Array();
   
  addCustomer=0;
  



  groupList: StockGroup[];
  groupName: any;
  dtOptions: DataTables.Settings = {};
  orderDate   : Date = new Date();
  mesurementList: MeasurementModel[];
  catList: CategoryModel[];
  subcatList: SubCategoryModel[];
  itemEntityList: ItemEntity[];
  customerList: Customer[];
  designList: DesignCategoryModel[];
  subDesignList: DesignSubCategoryModel[];
  subDesign: DesignSubCategoryModel= new  DesignSubCategoryModel();
  // designSubCategoryId: any;
  designCategoryModel : DesignCategoryModel= new DesignCategoryModel();
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
  orderDesignDetaislModelList: OrderDesignDetaislModel[]=new Array();
  orderDesignDetaislModel: OrderDesignDetaislModel= new OrderDesignDetaislModel();
  measurementId: any;

  itemTotal: any;

  isReadOnly: boolean =false;

  maxDate: Date = new Date();
  id=0;
  grandTotal:number = 0.00;
  baki:number = 0.00;
  designModel: any;
  sendData: any;
  customerCode: any;
  itemId: any;
  categoryId: any;
  orderid: any;
  isupdate = null;
  designSubCategoryId = [];
  orderDetailsModels: OrderDetailsModels = new OrderDetailsModels();
  orderDetailList: OrderDetailsModels[]=new Array();
  tempEdit = null;
  fDate: any;
  dDate: any;
  worker: any;
  comments: any;
  drestype =0;
  kof_design: any;

  kofDesign: any;
  kolordesign: any;
  buttondesign: any;
  poketdesign: any;
  selaydesign: any;
  chaindesign: any;
  lombas: number;
  buks: number;
  pets: number;
  hips: number;
  kads: number;
  hatas: number;
  golas: number;
  kafs: number;
  mohoris: number;
  gers: number;

  a = "";


  kof_designlist = [
    { id: 1, names: '12.25' },
    { id: 2, names: '12.50' },
    { id: 3, names: '12.75' },
    { id: 4, names: '13.00' },
    ];
    kolor_designlist = [
      { id: 1, name: 'kurthi neck' },
      { id: 2, name: 'design 1' },
      { id: 3, name: 'design 2' },
      { id: 4, name: 'design 3' },
    ];

    button_designlist = [
      { id: 1, name: '12.25' },
      { id: 2, name: '12.50' },
      { id: 3, name: '12.75' },
      { id: 4, name: '13.00' },
    ];

    poket_designlist = [
      { id: 1, name: '12.25' },
      { id: 2, name: '12.50' },
      { id: 3, name: '12.75' },
      { id: 4, name: '13.00' },
    ];

    selay_designlist = [
      { id: 1, name: '12.25' },
      { id: 2, name: '12.50' },
      { id: 3, name: '12.75' },
      { id: 4, name: '13.00' },
    ];
    chain_designlist = [
      { id: 1, name: '12.25' },
      { id: 2, name: '12.50' },
      { id: 3, name: '12.75' },
      { id: 4, name: '13.00' },
    ];

  

  loading= true;

  modalRef2: BsModalRef;
  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public apiService: OrderService,
    public settingService: SettingService,
    public customerService: CustomerService,
    public toastr: ToastrService,
  ) { }


  ngOnInit(): void {

    this.onClose = new Subject();
    // this.getgList();   
    // this.getCatList();
    // this.getItemList();
    // this. getItemModelList();
    this.getCustomerList();
    // this.getDesignList();


    if (this.sendData) {
      console.log("this.sendDatathis.sendDatathis.sendDatathis.sendData ",this.sendData);
      this.orderModel = this.sendData;
      this.customerCode = this.orderModel.customerCode;
      this.orderid = this.orderModel.orderNo;
      this.fDate = moment(this.orderModel.orderDate).format("DD/MM/YYYY");
      this.dDate = moment(this.orderModel.deliveryDate).format("DD/MM/YYYY");

      this.getCustomerInfo(this.customerCode);
      // this.getMesurmentInfo(this.orderModel.orderNo);
      // this.getAccountInfo(this.orderModel.orderNo);
      console.log("this.designList ,  item   ",this.orderModel.orderNo);
      this.getOrderDetails(this.orderModel.orderNo);
      // this.getGrandTotal();
     
    }
  }


  trackItem (index, item) {
    return this.mesurementList ? this.mesurementList : undefined;   }

    trackByFn(index, item:any) { 

      return item.id; 
    }


    ngSelectOpened(val){
      if(this.designList.length>0){
        for (let i = 0; i < this.designList.length; i++) {
          if( this.designList[i].designCategoryId == val.designCategoryId ){
            this.designList[i].designSubCategoryId = val.designSubCategoryId;
          }
          
        }
      }
      console.log("this.designList ,  item",this.designList);

    }
    // tracktrackmesuremnet (index, item) {
    //   return this.mesurementList ? this.mesurementList : undefined;   }

    tracktrackmesuremnet(index, item) { 
        return item.designSubCategoryId; 
      }

  getCustomerInfo(id){
    this.customerService.checkCustomerID(id).subscribe(data=>{
    this.customer= data.obj;
      console.log("this.customer this.customer this.customer",this.customer); 
    
    })
  }
  selecttype(v){


    console.log("this.customer",this.drestype); 

  }

  getDesignList() {
    this.settingService.getDesignList().subscribe(data => {
      this.designList = data['data'];
      
      if (this.designList.length > 0) {
        for (let i = 0; i < this.designList.length; i++) {
          this.settingService.findSubDesignlist(this.designList[i].designCategoryId).subscribe(data => {
            this.subDesignList = data;

            console.log("this.subDesignList", data);
            this.designList[i].designSubCategoryModelList = this.subDesignList;
          })
        }
      }
      console.log("this.designList", this.designList);
    })
  }

  // getSubDesignList(id){
  //   this.settingService.findSubDesignlist(id).subscribe(data=>{
  //   this.subDesignList= data['data'];
  //     console.log("this.subDesignList",this.customer); 
    
  //   })
  // }




  // getMesurmentInfo(orderNo){
  //   this.apiService.findMesurementByOrderid(orderNo).subscribe(data=>{
  //     console.log("this.mesurementList",data); 
    
  //     this.orderDetailsModellist = data;
  //   this.mesurementList = data;
  //     // this.customer= data.obj;
  //     console.log("this.mesurementList",this.orderDetailsModellist); 
  //     console.log("this.mesurementList",this.mesurementList); 
    
  //   })
  // }

  getOrderDetails(orderNo){
    this.apiService.findOrderDetailsByid(orderNo).subscribe(data=>{
         
     
       this.orderDetailList = data;
       console.log(" datadatadatadatadatadatadatadata", data); 
        // this.orderDetailsModels = data["obj"];

      });
  }

  getAccountInfo(orderNo){
    this.apiService.findAccountInfoByOrderid(orderNo).subscribe(data=>{

     this.orderAccountDetailsList= data;
     this.orderModel.orderAccountDetailsList = this.orderAccountDetailsList;
     for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
      this.orderAccountDetails = this.orderAccountDetailsList[i];
        
      this.apiService.findAccountInfoByOrderidandItemId(this.orderAccountDetails).subscribe(data=>{
         
        console.log(" datadatadatadatadatadatadatadata", data); 
          this.orderAccountDetailsList[i].detailsModel =data["obj"];
          // this.orderDetailsModels = data["obj"];

        });

     }
      console.log(" this.orderAccountDetailsList", this.orderAccountDetailsList); 
     
    
    })
  }


  // getmesurementList(itemId):any{
  //   // console.log(itemId); 
    
    
  //   this.apiService.getMesurementlistByItemId(itemId).subscribe(data=>{
  //     this.mesurementList= data;
  //     // console.log(this.mesurementList); 
    
  //   })


  //   }


    getCustomerList(){
      this.customerService.getCustomerList().subscribe((data)=>{
        
        this.customerList= data['data'];
        console.log(this.customerList); 
      })
      }
      getCatList(){
        this.settingService.getCatList().subscribe((data)=>{
          
          this.catList= data['data'];
          // console.log(this.catList); 
        })
        }

    getItemList(){
      this.settingService.getSubCatList().subscribe((data)=>{
        
        this.subcatList= data['data'];
        // console.log(this.subcatList); 
      })
      }

      getItemModelList(){
        this.settingService.getSubItemModel().subscribe((data)=>{
          
          this.itemEntityList= data['data'];
          // console.log(this.itemEntityList); 
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

  
  // onSaveOrUpdate(form: NgForm) {

    
  //   if(this.orderModel.orderNo){
  //     // this.updateSupplier(form);
  //   } else {
  //     console.log("CREATE",form);
  //     this.createOrder(form);
  //   } 
  // }


  onSaveOrUpdate(form: NgForm) {
    console.log("update", 1);
    this.addorder(form);
  }

  addorder(form: NgForm){
    console.log("this.orderModel", this.orderModel);
    
    if(this.id ==0){
      console.log("one", 1);
      this.id= this.orderModel.orderNo;
      this.addods(form)
    }else if(this.id == this.orderModel.orderNo){
      console.log("two", 2);
      this.addods(form)
    }else{
      console.log("three", 3);
      this.id= this.orderModel.orderNo;
      // this.orderDetailList = new Array();
      this.addods(form)
    } 
  }

  addods(form: NgForm){
    //this.model.rate;
    if(this.orderAccountDetails.itemRate>0){
      const  model: OrderDetailsModels = new OrderDetailsModels();
      if (this.isupdate != null) {
        this.updates(this.tempEdit, model)
      } else {
  
    for (let i = 0; i < this.orderDetailList.length; i++) {
            if(this.orderDetailList[i].i_id== this.orderDetailsModels.i_id){
              this.toastr.warning('Duplicate Item can not be added');
              return;
            }
      
    }
    this.id += 1;
      model.id = this.id;
      model.orderd_no = this.orderModel.orderNo;
      model.i_id= this.itemId;
      model.productName=this.orderDetailsModels.productName;
      model.qty= this.orderAccountDetails.qty;
      model.item_price= this.orderAccountDetails.itemRate;
      model.item_total_val = this.orderDetailsModels.qty * this.orderDetailsModels.item_total_val;
   


      model.kof_design=this.orderDetailsModels.kof_design;
      model.kolor_design= this.orderDetailsModels.kolor_design ;
      model.button_design =this.orderDetailsModels.button_design;
      model.poket_design =this.orderDetailsModels.poket_design;
      model.selay_design =this.orderDetailsModels.selay_design;
      model.chain_design = this.orderDetailsModels.chain_design;
      
      model.buk = this.orderDetailsModels.buk;
      model.pet = this.orderDetailsModels.pet;
      model.hip= this.orderDetailsModels.hip;
      model.kad = this.orderDetailsModels.kad;
      model.hata= this.orderDetailsModels.hata;
      model.gola= this.orderDetailsModels.gola;
      model.kaf= this.orderDetailsModels.kaf;
      model.ger= this.orderDetailsModels.ger;

      model.mohori = this.orderDetailsModels.mohori;
      model.lomba = this.orderDetailsModels.lomba;


      model.komor= this.orderDetailsModels.komor;
      model.hif= this.orderDetailsModels.hif;
      model.thai= this.orderDetailsModels.thai;
      model.hai= this.orderDetailsModels.hai;

      model.ctype= this.drestype;
    
     


      this.orderDetailList.push(model);
      console.log(" this.orderDetailList this.orderDetailList", this.orderDetailList);
      this.getGrandTotal();
      
      this.reset();
   }
}else{
      this.toastr.warning(' salse rate is not valid');
    }
}

updates(models, entity) {
  console.log("entity",entity);
  console.log("models",models);
  console.log("model",this.orderDetailsModels);
  for(let i=0; i < this.orderDetailList.length; ++i){
      if(this.orderDetailList[i].i_id == models.i_id){
        
         this.orderDetailList[i].i_id = models.i_id;
         this.orderDetailList[i].qty = this.orderAccountDetails.qty;
        //  this.orderDetailList[i].productName = models.productName;
        this.orderDetailList[i].productName= models.productName;
         this.orderDetailList[i].item_price = models.item_price;
         this.orderDetailList[i].kof_design = models.kof_design;
         this.orderDetailList[i].kolor_design = models.kolor_design ;
         this.orderDetailList[i].button_design = models.button_design;
         this.orderDetailList[i].poket_design = models.poket_design;
         this.orderDetailList[i].selay_design = models.selay_design;
         this.orderDetailList[i].chain_design = models.chain_design;
         this.orderDetailList[i].lomba = models.lomba;
         this.orderDetailList[i].buk = models.buk;
         this.orderDetailList[i].pet = models.pet;
         this.orderDetailList[i].hip= models.hip;
         this.orderDetailList[i].kad = models.kad;
         this.orderDetailList[i].hata= models.hata;
         this.orderDetailList[i].gola= models.gola;
         this.orderDetailList[i].kaf= models.kaf;
         this.orderDetailList[i].mohori = models.mohori;
         this.orderDetailList[i].ger= models.ger;

         this.orderDetailList[i].komor= models.komor;
         this.orderDetailList[i].hif= models.hif;
         this.orderDetailList[i].thai= models.thai;
         this.orderDetailList[i].hai= models.hai;
         this.orderDetailList[i].ctype= models.ctype;




   
      }
  }
  this.getGrandTotal();
  this.reset();
  this.isupdate = null;
}



  selectL1Item(getItem):any{  
    this.reset();
    console.log(getItem); 
    this.orderAccountDetails.itemRate= getItem.itemAmount;
    this.orderAccountDetails.itemId =getItem.itemId;
    this.orderAccountDetails.itemName = getItem.itemName;
    this.orderDetailsModels.productName = getItem.itemName;
    // this.getTotal();


    
  }

  editDatas(entity, s){
    this.getCatList();
    this.getItemList();
    this.editdata(entity, s);
  }

  checktyped(data):any{

    if(data !=null){
      this.settingService.findDTypeList(data).subscribe(
        (resp) => {
          console.log('create  category type', resp);
          if (resp) {
          this.catList = new Array();
          this.subcatList = new Array();
         
           this.catList = resp;
           this.drestype = data;
          } else {
          
          }
        },
        (err) => {
          this.toastr.warning('', "something wrong");
        },
      );
    }else{
      this.toastr.warning('', "something wrong");
    }
  }

  editdata(entity, s) {
    console.log("total",entity);


    this.drestype=   entity.ctype;

    // this.checktyped(this.drestype);
    this.categoryId = entity.categoryId;
    // console.log("this.sssssscategoryId",this.categoryId);

    // this.selectCategory(entity.categoryId);

    this.itemId = entity.i_id;

    console.log("this.ssaaaaaacategoryId",this.categoryId);

    this.orderDetailsModels.ctype= entity.ctype;
    this.orderDetailsModels.categoryId= entity.categoryId;
    this.orderDetailsModels.id= entity.id;
    this.orderDetailsModels.i_id = entity.i_id;
    this.orderDetailsModels.qty = entity.qty;
    this.itemId = entity.i_id;
    this.orderAccountDetails.itemRate = entity.item_price;
    this.orderAccountDetails.qty = entity.qty;


    // this.orderDetailsModels.item_price = entity.item_price;

    this.orderDetailsModels.item_price = entity.item_price;
    this.orderDetailsModels.kof_design = entity.kof_design;
    this.orderDetailsModels.kolor_design = entity.kolor_design ;
    this.orderDetailsModels.button_design = entity.button_design;
    this.orderDetailsModels.poket_design = entity.poket_design;
    this.orderDetailsModels.selay_design = entity.selay_design;
    this.orderDetailsModels.chain_design = entity.chain_design;
    this.orderDetailsModels.lomba = entity.lomba;
    this.orderDetailsModels.buk = entity.buk;
    this.orderDetailsModels.pet = entity.pet;
    this.orderDetailsModels.hip= entity.hip;
    this.orderDetailsModels.kad = entity.kad;
    this.orderDetailsModels.hata= entity.hata;
    this.orderDetailsModels.gola= entity.gola;
    this.orderDetailsModels.kaf= entity.kaf;
    this.orderDetailsModels.mohori = entity.mohori;
    this.orderDetailsModels.ger= entity.ger;

    this.orderDetailsModels.komor= entity.komor;
    this.orderDetailsModels.hif= entity.hif;
    this.orderDetailsModels.thai= entity.thai;
    this.orderDetailsModels.hai= entity.hai;

    // this.orderDetailsModels.hai= entity.hai;
    

    



    this.orderDetailsModels.productName= entity.productName;

    this.getGrandTotal();
    // model.mobile = entity.mobile;

    this.tempEdit =  this.orderDetailsModels;
    this.isupdate = entity;
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
    console.log("sdfsdddddddddddddddddddddddddddddd",category); 
    this.itemId= null;
    this.settingService.findByCategoryid(category.categoryId).subscribe(data=>{
      this.reset();
      this.subcatList= data;
       
    })

  }


  onSaveOrUpdates(form: NgForm){

    console.log("CREATE",form);
    // this.createCustomre(form);
  }

  checkUserId(){
    this.customerService.findCustomerbyMobile(this.customer.mobile).subscribe(res => {
      if (res.success) {
        this.toastr.warning("User Id exists. Please choose a different one!")
        this.customer.mobile = ""
      }
    })
  
}

offd(){
  this.addCustomer = 0;
}
 
addNewCustomer(x){
  this.addCustomer = 1;
  this.customer = new Customer();
}
  createCustomre(): void {
    console.log(this.customer); // print room obj
    // this.customer.ssCreator= this.token.getUsername();
    
     
    this.customerService.savecustomer(this.customer).subscribe(
      (resp) => {
        console.log('create ', resp);
        if (resp) {
         this.addCustomer = 0;
         
          this.toastr.success('', resp.mobile);

          this.getCustomerfindByMobile(resp.mobile);


            
        } else {
          //  this.toastr.success('', "Something  wrong");
        }
      },
      (err) => {
        //  this.toastr.warning('', "There have an error");
      }
    );
  }

  getCustomerfindByMobile(id){
    this.customerService.findCustomerbyMobile(id).subscribe(data=>{
    this.getCustomerList();
    this.customer= data.obj;
    
    this.customerCode = this.customer.customerCode;
      console.log("this.customer",this.customer); 
    
    })
  }

  


  selectCustomer(customer):any{  
    console.log(customer); 
   if(customer != null){
    this.customer = customer;
    // this.loading = false;
    if(customer !=null){
        this.orderModel.customerCode = customer.customerCode;
        
       
    }
   }
  }
 

  submitOrders():any{
    if(this.orderid !=null){
      if(this.orderid == this.orderModel.orderNo){
        this.updateOrder();

      }

    }else{
      this.saveOrder();
    }
  }

  updateOrder():any{
    this.getGrandTotal();

    console.log('orderModel', this.orderModel);
    if(this.orderModel.orderNo !=null){
    
      this.orderModel.status = 1;
    
      this.orderModel.detailsList = this.orderDetailList;
      this.orderModel.totalAmount =  this.grandTotal;
      
      if(this.orderModel.detailsList.length !=0){

 

        console.log('orderdetaillist', this.orderModel.detailsList.length);
        for (let i = 0; i < this.orderModel.detailsList.length; i++) {
          console.log('i_value', i);

          this.orderModel.detailsList[i].orderd_no = this.orderModel.orderNo;

          
        }
       
        console.log('orderdetaillist', this.orderModel);
  
        this.apiService.updateOrder(this.orderModel).subscribe(
          (resp) => {
            console.log('update ', resp);
            if (resp) {
              
               this.toastr.success('', 'Successfully Update Order');
              this.onClose.next(true);
              this.bsModalRef.hide();
            } else {
               this.toastr.success('', 'Successfully Update order');
            }
          },
          (err) => {
            this.toastr.warning('', 'Error occurred');
          }
        );
      }else{
      this.toastr.warning('Item list is null');
      return;
    }
    }else{
      this.toastr.warning('order id null');
      return;
    }
  }


  saveOrder():any{
      
    console.log('orderModel list', this.orderModel);
    // if(this.orderModel.orderId !=null){
         
      // this.orderModel.ssCreator= this.token.getUsername();
      this.orderModel.status = 1;
      // this.orderModel.deliveryStatus = "1"
      this.orderModel.detailsList = this.orderDetailList;
      // this.orderModel.comments = this.comments;
      // this.orderModel.worker = this.worker;
      this.orderModel.deliveryDate = this.dDate;
      // this.orderModel.orderDate = this.fDate;
      this.orderModel.totalAmount =  this.grandTotal;
      this.orderModel.customerCode = this.customerCode;



      console.log('orderdetaillist', this.orderDetailList);
      console.log('orderdetaillist', this.orderModel.orderDetailList);

      if(this.orderModel.detailsList.length!=0){

        console.log('orderdetaillist', this.orderModel.detailsList.length);
        for (let i = 0; i < this.orderModel.detailsList.length; i++) {
          console.log('i_value', i);

          this.orderModel.detailsList[i].orderd_no = this.orderModel.orderNo; 
        }
        this.apiService.saveOrder(this.orderModel).subscribe(
          (resp) => {
            console.log('create ', resp);
            if (resp) {
             
              this.toastr.success('', resp.message);
              this.onClose.next(true);
              this.bsModalRef.hide();
            } else {
            
            }
          },
          (err) => {
            this.toastr.warning('', "something wrong");
          },
        );
      }else{
      this.toastr.warning('Item list is null');
      return;
    }
  }


checktype(data):any{

  if(data !=null){
    this.settingService.findDTypeList(data).subscribe(
      (resp) => {
        console.log('create  category type', resp);
        if (resp) {
        this.categoryId = null;
        this.itemId = null;
        this.catList = new Array();
        this.subcatList = new Array();
        this.reset();
         this.catList = resp;
         this.drestype = data;
        } else {
        
        }
      },
      (err) => {
        this.toastr.warning('', "something wrong");
      },
    );
  }else{
    this.toastr.warning('', "something wrong");
  }
   

}

   



  getGrandTotal():any{
    this.grandTotal=0;
    console.log("addorder", this.grandTotal);
    this.orderDetailList.forEach(element => {
      this.grandTotal += element.qty*element.item_price ;
      //this.getVatamount();
    });  

    this.orderModel.totalAmount= this.grandTotal;

    if(this.orderModel.adAmunt!=null){
     this.orderModel.baki =  this.grandTotal - this.orderModel.adAmunt;
     console.log("addorder", this.grandTotal);
    }
  
  }
  reset() {
    this.designModel= "";
    this.itemModelId=[];
    this.mesurementList = [];
    this.orderAccountDetails =new OrderAccountDetails();
    this.orderDetailsModels = new OrderDetailsModels();
  }
  
 

  
}
