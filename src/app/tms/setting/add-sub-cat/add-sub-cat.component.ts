import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Customer } from '../../customer/customer.model';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'app-add-sub-cat',
  templateUrl: './add-sub-cat.component.html',
  styleUrls: ['./add-sub-cat.component.css']
})
export class AddSubCatComponent implements OnInit {
  onClose: Subject<boolean>;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  title: any;
  // [items]="groupList"
  categoryList : any;  
  sendData: any;

  customer: Customer = new Customer;
  customerId: any;

  constructor(
    public bsModalRef: BsModalRef,
    public apiService: CustomerService,
    public toastr: ToastrService,
  ) { }
 
  ngOnInit(): void {
    this.onClose = new Subject(); 
    // this.getProdOneList();
    if (this.sendData) {
      this.customer = this.sendData;
      this.customerId = this.customer.cusId;
    }
  }

  onSaveOrUpdate(form: NgForm) {
    if (this.customerId) {
      console.log("UPDATE",form); 
      this.update(form);
    } else {
      console.log("CREATE",form);
      this.create(form);
    } 
  }
   
  create(form: NgForm): void {
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

  update(form: NgForm): void {
    console.log(this.customer); // print room obj
   
  
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
