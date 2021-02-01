import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../model/stockGroup.Model';

@Component({
  selector: 'app-addorders',
  templateUrl: './addorders.component.html',
  styleUrls: ['./addorders.component.css']
})
export class AddordersComponent implements OnInit {

  onClose: Subject<boolean>;
  purchaseDetailList: any[]=new Array();
  grandTotal= 0;
  groupList: StockGroup[];
  groupName: any;
  constructor(
    public bsModalRef: BsModalRef,
    public apiService: OrderService,
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.getgList();   
    this.getProdoneList();
    
  }

  getgList() {
    this.apiService.getProductGList().subscribe((data) => {
      console.log(data);
      // this.groupList = JSON.parse(data.results);
      // this.groupList= data['results'];
      // console.log(this.groupList);
      // console.log(this.prodOneList)
    })
  }

  selectL1Item(getItem):any{  
    // console.log('data list', getItem);
    // if(getItem !=null){
    //     this.model.productName = getItem.productname;
    //     this.model.purchaseRate = getItem.salesrate;
    //   console.log('data list', this.model.productName);
    //   console.log('data list', this.model.purchaseRate);
    // }
  }


  onSaveOrUpdate(form: NgForm) {
    // console.log("update", 1);
    // this.addPurchase(form);
  }

  addPurchase(form: NgForm){
    // console.log("this.purchaseModel", this.purchaseModel);
    // if(this.pId ==0){
    //   console.log("one", 1);
    //   this.pId= this.purchaseModel.purchaseId;
    //   this.addp(form)
    // }else if(this.pId == this.purchaseModel.purchaseId){
    //   console.log("two", 2);
    //   this.addp(form)
    // }else{
    //   console.log("three", 3);
    //   this.pId= this.purchaseModel.purchaseId;
    //   this.purchaseDetailList = new Array();
    //   this.addp(form)
    // }
    
    
  }

  addp(form: NgForm){

//     const  model: PurchaseDetailsModel = new PurchaseDetailsModel();
//     if (this.isupdate != null) {
//       this.update(this.tempEdit, model)
//     } else {
// if(this.purchaseModel.purchaseId !=null){
//   for (let i = 0; i < this.purchaseDetailList.length; i++) {
//           if(this.purchaseDetailList[i].l4code== this.model.l4code){
//             this.toastr.warning('Duplicate Item can not be added');
//             return;
//           }
    
//   }
//   this.id += 1;
//     model.id = this.id;
//     model.purchaseId = this.purchaseModel.purchaseId
//     model.l4code= this.model.l4code;
//     model.qty= this.model.qty;
//     model.purchaseRate= this.model.purchaseRate;
//     model.productName= this.model.productName;

//     this.purchaseDetailList.push(model);
    
//     this.getGrandTotal();
    
//     this.reset();
//     }else{
//       this.toastr.warning('please select a purchase');
//     }
  
//     }
  }



  getGrandTotal():any{
    // this.grandTotal=0;
    // console.log("addpurchase", this.purchaseDetailList);
    // this.purchaseDetailList.forEach(element => {
    //   this.grandTotal += element.qty*element.purchaseRate;
     
    // });
    // console.log("total",this.grandTotal);
  }

  editData(entity, s) {
    // console.log("total",entity);
    // this.model.id= entity.id;
    // this.model.l4code= entity.l4code;
    // this.model.qty = entity.qty;
    // this.model.productName = entity.productName;
    // this.model.purchaseRate = entity.purchaseRate;
    // // model.mobile = entity.mobile;

    // this.tempEdit =  this.model;
    // this.isupdate = entity;
  }

  update(models, entity) {
    // console.log("entity",entity);
    // console.log("model",models);
    // console.log("model",this.model);
    // for(let i=0; i < this.purchaseDetailList.length; ++i){
    //     if(this.purchaseDetailList[i].id == models.id){
          
    //        this.purchaseDetailList[i].l4code = models.l4code;
    //        this.purchaseDetailList[i].qty = models.qty;
    //        this.purchaseDetailList[i].productName = models.productName;
          
    //        this.purchaseDetailList[i].purchaseRate = models.purchaseRate;
    //     }
    // }
    // this.getGrandTotal();
    // this.reset();
    // this.isupdate = null;
  }

  deleteitem(id) {
    // for (let i = 0; i < this.purchaseDetailList.length; i++) {
    //   if(this.purchaseDetailList[i].id === id){
    //     console.log('data list', this.purchaseDetailList[i].id);
    //     this.purchaseDetailList.splice(i,1);
    //     this.getGrandTotal();
    //     return;
    //   }

    // }
  }

  getProdoneList(){
    // this.productService.getProductList().subscribe((data)=>{
      
    //   this.productList= data['data'];
    // })
    }

    reset() {
      // this.model = new PurchaseDetailsModel();
      // this.l4code ="";
      // this.qty="";
      // this.productName="";
      // this.purchaseRate = 0;
    }

    checkpurchaseId(data){
    //   this.checkpurId();
    //  if( this.purchaseModel.purchaseId != data.purchaseId){
    //   this.purchaseDetailList = new Array();
    //  }

    }
    checkpurId(){
      // if(this.selectedPuId ==null){
      //   if (this.purchaseModel.purchaseId) {
      //     const data = {
      //       "purchaseId": this.purchaseModel.purchaseId
      //     }
      //     this.apiService.checkPurchaseID(this.purchaseModel.purchaseId).subscribe(res => {
      //       if (res.obj !=null) {
      //         this.toastr.warning("purchase id  exists. Please choose a different one!")
      //         this.purchaseModel.purchaseId = null;
      //       }
      //     })
      //   } 
      // }

        
  }


  submitPurchase():any{

    // if(this.selectedPuId !=null){
    //   if(this.selectedPuId == this.purchaseModel.purchaseId ){
    //     this.updatepurchase();

    //   }

    // }else{
    //   this.submitPurchace();
    // }
  }

    updatepurchase():any{

      // console.log('purchaseModel', this.purchaseModel);
      // if(this.purchaseModel.purchaseId !=null){
      //   this.purchaseModel.ssModifier= this.token.getUsername();
      //   this.purchaseModel.purchaseDetailsList = this.purchaseDetailList;
      //   if(this.purchaseModel.purchaseDetailsList.length !=0){
      //     for (let i = 0; i < this.purchaseModel.purchaseDetailsList.length; i++) {
      //       this.purchaseModel.purchaseDetailsList[i].purchaseId = this.purchaseModel.purchaseId;
      //     }
         
      //     console.log('purchaseDetailList', this.purchaseModel);
    
      //     this.apiService.updatePurchase(this.purchaseModel).subscribe(
      //       (resp) => {
      //         console.log('update ', resp);
      //         this.bsModalRef.hide();
      //       },
      //       (err) => {
            
      //       }
      //     );
      //   }else{
      //   this.toastr.warning('Item list is null');
      //   return;
      // }
      // }else{
      //   this.toastr.warning('purchase id null');
      //   return;
      // }
    }


    submitPurchace():any{
      
      // console.log('purchaseModel', this.purchaseModel);
      // if(this.purchaseModel.purchaseId !=null){
      //   this.purchaseModel.ssCreator= this.token.getUsername();
      //   this.purchaseModel.purchaseDetailsList = this.purchaseDetailList;
      //   if(this.purchaseModel.purchaseDetailsList.length !=0){
      //     for (let i = 0; i < this.purchaseModel.purchaseDetailsList.length; i++) {
      //       this.purchaseModel.purchaseDetailsList[i].purchaseId = this.purchaseModel.purchaseId;
      //     }
         
      //     console.log('purchaseDetailList', this.purchaseModel);
    
      //     this.apiService.savepurchase(this.purchaseModel).subscribe(
      //       (resp) => {
      //         console.log('create ', resp);
      //         this.bsModalRef.hide();
      //       },
      //       (err) => {
            
      //       }
      //     );
      //   }else{
      //   this.toastr.warning('Item list is null');
      //   return;
      // }
      // }else{
      //   this.toastr.warning('purchase id null');
      //   return;
      // }
      


    }


}
