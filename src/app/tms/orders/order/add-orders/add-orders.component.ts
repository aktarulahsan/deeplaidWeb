import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
 
import { BsModalRef } from 'ngx-bootstrap/modal';
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
  designModel: any;
  sendData: any;
  customerCode: any;
  itemId: any;
  orderid: any;
  isupdate = null;
  designSubCategoryId = [];
  orderDetailsModels: OrderDetailsModels = new OrderDetailsModels();
  kof_design: any;
  kof_designlist = [
    { id: 1, kof_design: '12.25' },
    { id: 2, kof_design: '12.50' },
    { id: 3, kof_design: '12.75' },
    { id: 4, kof_design: '13.00' },
    ];
    kolor_designlist = [
      { id: 1, name: '12.25' },
      { id: 2, name: '12.50' },
      { id: 3, name: '12.75' },
      { id: 4, name: '13.00' },
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
    this.getDesignList();


    if (this.sendData) {
      
      this.orderModel = this.sendData;
      this.customerCode = this.orderModel.customerCode;
      this.orderid = this.orderModel.orderNo;

      this.getCustomerInfo(this.customerCode);
      // this.getMesurmentInfo(this.orderModel.orderNo);
      this.getAccountInfo(this.orderModel.orderNo);
     
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
      console.log("this.customer",this.customer); 
    
    })
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

  getSubDesignList(id){
    this.settingService.findSubDesignlist(id).subscribe(data=>{
    this.subDesignList= data['data'];
      console.log("this.subDesignList",this.customer); 
    
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
     this.orderModel.orderAccountDetailsList = this.orderAccountDetailsList;
     for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
      this.orderAccountDetails = this.orderAccountDetailsList[i];
        
      this.apiService.findAccountInfoByOrderidandItemId(this.orderAccountDetails).subscribe(data=>{
         
          
          this.orderAccountDetailsList[i].ordermeasurementList =data["items"];

        });

     }
      console.log(" this.orderAccountDetailsList",this.orderDetailsModellist); 
     
    
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
  //  if(entity.designCategoryModelList){
    // for (let i = 0; i < entity.designCategoryModelList.length; i++) {

   
       
    //   // this.designSubCategoryId = entity.designCategoryModelList[i].designSubCategoryId;
    //   for (let j = 0; j < this.designList[i].designSubCategoryModelList.length; j++) {
    //     this.designList[i].designSubCategoryModelList[j].designSubCategoryId=entity.designCategoryModelList[i].designSubCategoryId; ;
        
    //   }
      
    // }

  //  }

  // for (let i = 0; i < this.designList.length; i++) {
  //   if( this.designList[i].designCategoryId == entity.designCategoryModelList[i].designCategoryId ){
  //     // this.designList[i].designSubCategoryId = val.designSubCategoryId;
  //     this.designSubCategoryId
  //   }
    
  // }

    
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
    console.log("this.itemModelId",entity);

    // console.log("entity.ordermeasurementList",entity.ordermeasurementList);
    // this.orderAccountDetails.designModel= this.designModel;
    // this.itemModelId = entity.designModel;

    console.log(entity.ordermeasurementList); 
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
    console.log(category); 
    this.settingService.findByCategoryid(category.categoryId).subscribe(data=>{
      this.subcatList= data;
       
    })

  }


  onSaveOrUpdates(form: NgForm){


  }


  selectCustomer(customer):any{  
    console.log(customer); 
    this.customer = customer;
this.loading = false;
    if(customer !=null){
        this.orderModel.customerCode = customer.customerCode;
        
       
    }
  }
  update() {
 
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
    for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
      if(this.orderAccountDetailsList[i].itemId == this.orderAccountDetails.itemId){
        this.orderAccountDetailsList[i].itemRate= this.orderAccountDetails.itemRate;
        this.orderAccountDetailsList[i].itemName= this.orderAccountDetails.itemName;
        this.orderAccountDetailsList[i].qty= this.orderAccountDetails.qty;
        this.orderAccountDetailsList[i].itemTotalAmount= this.orderAccountDetails.itemTotalAmount;
        this.orderAccountDetailsList[i].designModel= this.orderAccountDetails.designModel;
        this.orderAccountDetailsList[i].ordermeasurementList= this.mesurementList;

      
      }

  }
  this.getGrandTotal();
      
  this.reset();

}

addod(){
    console.log("this.designList",this.designList);
  const  model: OrderAccountDetails = new OrderAccountDetails();
    if (this.isupdate != null) {
      this.update()
    }else{
    for (let i = 0; i < this.orderAccountDetailsList.length; i++) {
      if (this.orderAccountDetailsList[i].itemId == this.orderAccountDetails.itemId) {
        this.toastr.warning('Duplicate Item can not be added');
        return;
      }

    }


    for (let i = 0; i < this.designList.length; i++) {
      const element = this.designList[i];
      
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

    this.orderDetailsModels.kof_design = this.kof_design;


    plist = this.mesurementList;

    this.orderAccountDetails.ordermeasurementList = plist;
      this.id += 1;
      this.orderAccountDetails.id = this.id;
      this.orderAccountDetails.designModel= this.designModel;
      console.log("this.orderAccountDetails",this.orderAccountDetails);
    this.orderAccountDetails.detailsList.push(this.orderDetailsModels);
    this.orderAccountDetails.designCategoryModelList = this.designList;
    this.orderAccountDetailsList.push(this.orderAccountDetails);

    console.log("this.orderAccountDetailsList ",this.orderAccountDetailsList);
    this.getGrandTotal();
      
    this.reset();
  }

 
   
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
      if(this.customerCode){
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
      }else{
      }
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
    this.getDesignList();
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

//   public downloadAsPDF() {
//     const doc = new jsPDF();

//     var x = document.getElementById("myTd");
//     x.innerHTML = this.userName;

//     const specialElementHandlers = {
//       '#editor': function (element, renderer) {
//         return true;
//       }
//     };

//     const pdfTable = this.pdfTable.nativeElement;
//     doc.text("Hello world!", 1, 1);
// doc.save("two-by-four.pdf");

//     doc.fromHTML(pdfTable.innerHTML, 15, 15, {
//       width: 190,
//       'elementHandlers': specialElementHandlers
//     });

//   console.log(doc.output('dataurl'));
//   console.log(this.userName);


//   }

  
}
