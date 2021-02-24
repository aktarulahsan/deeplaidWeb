import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DesignCategoryModel } from '../../model/designCategory.Model';
 
 
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-add-design-category',
  templateUrl: './add-design-category.component.html',
  styleUrls: ['./add-design-category.component.css']
})
export class AddDesignCategoryComponent implements OnInit {

  onClose: Subject<boolean>;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  title: any;
  
  sendData: any;

  categoryModel: DesignCategoryModel = new DesignCategoryModel;
  categoryId: any;

  constructor(
    public bsModalRef: BsModalRef,
    public apiService: SettingService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject(); 
    // this.getProdOneList();
    if (this.sendData) {
      this.categoryModel = this.sendData;
      this.categoryId = this.categoryModel.designCategoryId;
    }
  }

  
  onSaveOrUpdate(form: NgForm) {
    if (this.categoryId) {
      console.log("UPDATE",form); 
      this.updateCustomre(form);
    } else {
      console.log("CREATE",form);
      this.createCustomre(form);
    } 
  }
   
  createCustomre(form: NgForm): void {
    console.log(this.categoryModel); // print room obj
    // this.customer.ssCreator= this.token.getUsername();
    
     
    this.apiService.saveDesign(this.categoryModel).subscribe(
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
    console.log(this.categoryModel); // print room obj
    // this.customer.ssModifier= this.token.getUsername();
  
    this.apiService.updateDesign(this.categoryModel).subscribe(
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



