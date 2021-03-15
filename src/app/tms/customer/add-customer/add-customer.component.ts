import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
 
  onClose: Subject<boolean>;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  title: any;
  
  sendData: any;

  customer: Customer = new Customer;
  customerId: any;

  isReadOnly: boolean;
  userValidetor: string;

  constructor(
    // private token: TokenStorageService,
    public bsModalRef: BsModalRef,
    public apiService: CustomerService,
    public toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.onClose = new Subject(); 
    // this.getProdOneList();
    if (this.sendData) {
      this.isReadOnly = true;
      this.customer = this.sendData;
      this.customerId = this.customer.customerCode;
    }
  }

  
  onSaveOrUpdate(form: NgForm) {
    if (this.customerId) {
      console.log("UPDATE",form); 
      this.updateCustomre(form);
    } else {
      console.log("CREATE",form);
      this.createCustomre(form);
    } 
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


  checkUserId(){
    console.log('data list', this.customer.mobile);
    if(!this.isReadOnly){
      if (this.userValidetor != this.customer.mobile) {
        const data = {
          "uid": this.customer.mobile
        }
        
        this.apiService.findCustomerbyMobile(this.customer.mobile).subscribe(res => {
          if (res.success) {
            this.toastr.warning("User Id exists. Please choose a different one!")
            this.customer.mobile = ""
          }
        })
      } 
    }
       
}



  createCustomre(form: NgForm): void {
    console.log(this.customer); // print room obj
    // this.customer.ssCreator= this.token.getUsername();
    
     
    this.apiService.save(this.customer).subscribe(
      (resp) => {
        console.log('create ', resp);
        if (resp) {
          form.resetForm();
          //  this.toastr.success('', 'Create Successfull');
          this.onClose.next(true);
          this.bsModalRef.hide();
        } else {
          //  this.toastr.success('', "Something  wrong");
        }
      },
      (err) => {
        //  this.toastr.warning('', "There have an error");
      }
    );
  }

  updateCustomre(form: NgForm): void {
    console.log(this.customer); // print room obj
    // this.customer.ssModifier= this.token.getUsername();
  
    this.apiService.update(this.customer).subscribe(
      (resp) => {
        console.log('update ', resp);
        if (resp) {
          form.resetForm();
          // this.toastr.success('', 'Update Successfull');
          this.onClose.next(true);
          this.bsModalRef.hide();
        } else {
          //  this.toastr.warning('', "Something wrong");
        }
      },
      (err) => {
        // this.toastr.warning('', 'Error occured');
      }
    );
  }

}
