import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MesurementService } from '../../measurement/service/mesurement.service';
import { DesignCategoryModel } from '../../model/designCategory.Model';
import { DesignSubCategoryModel } from '../../model/desingSubCategory.Model';
 
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-add-design-sub-category',
  templateUrl: './add-design-sub-category.component.html',
  styleUrls: ['./add-design-sub-category.component.css']
})
export class AddDesignSubCategoryComponent implements OnInit {

  
  onClose: Subject<boolean>;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  title: any;
  desingList: DesignCategoryModel[];
  sendData: any;
  isReadOnly: boolean =false;
  designSubCategory: DesignSubCategoryModel = new DesignSubCategoryModel;
  designSubCategoryId: any;

  constructor(
    public bsModalRef: BsModalRef,
    public apiService: MesurementService,
    public settingService: SettingService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject(); 
    this.getItemList();
    if (this.sendData) {
      this.isReadOnly= true;
      this.designSubCategory = this.sendData;
      this.designSubCategoryId = this.designSubCategory.designSubCategoryId;
    }
  }

  getItemList(){
    this.settingService.getDesignList().subscribe((data)=>{
      
      this.desingList= data['data'];
      console.log(this.desingList); 
    })
    }

  
  onSaveOrUpdate(form: NgForm) {
    if (this.designSubCategoryId) {
      console.log("UPDATE",form); 
      this.updatemesurment(form);
    } else {
      console.log("CREATE",form);
      this.savemesurment(form);
    } 
  }
   
  savemesurment(form: NgForm): void {
    console.log(this.designSubCategory); // print room obj
    // this.customer.ssCreator= this.token.getUsername();
    
     
    this.settingService.saveSubDesign(this.designSubCategory).subscribe(
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

  updatemesurment(form: NgForm): void {
    console.log(this.designSubCategory); // print room obj
    // this.customer.ssModifier= this.token.getUsername();
  
    this.settingService.updateSubDesign(this.designSubCategory).subscribe(
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
