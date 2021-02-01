import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../../model/stockGroup.Model';

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
  constructor(
    public bsModalRef: BsModalRef,
    public apiService: OrderService,
    public toastr: ToastrService,
  ) { }


  ngOnInit(): void {

    this.onClose = new Subject();
    // this.getgList();   
    // this.getProdoneList();
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
    // if (this.supplierid) {
    //   console.log("UPDATE",form); 
    //   this.updateSupplier(form);
    // } else {
    //   console.log("CREATE",form);
    //   this.createSupplier(form);
    // } 
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



  // createSupplier(form: NgForm): void {
  //   console.log(this.supplier); // print room obj
  //   this.supplier.ssCreator= this.token.getUsername();
    
     
  //   this.apiService.saveSupplier(this.supplier).subscribe(
  //     (resp) => {
  //       console.log('create ', resp);
  //       if (resp) {
  //         form.resetForm();
  //          this.toastr.success('', 'Create Successfull');
  //         this.onClose.next(true);
  //         this.bsModalRef.hide();
  //       } else {
  //          this.toastr.success('', "Something  wrong");
  //       }
  //     },
  //     (err) => {
  //        this.toastr.warning('', "There have an error");
  //     }
  //   );
  // }

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
