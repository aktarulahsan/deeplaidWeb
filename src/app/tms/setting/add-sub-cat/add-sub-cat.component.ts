import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
 import { SubCategoryModel } from '../model/subCategory.Model';
import { SettingService } from '../service/setting.service';
import { CategoryModel } from '../model/category.Model';

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
  catList: CategoryModel[];
  categoryList : any;  
  sendData: any;

  model: SubCategoryModel = new SubCategoryModel;
  modelId: any;

  constructor(
    public bsModalRef: BsModalRef,
    public apiService: SettingService,
    public toastr: ToastrService,
  ) { }
 
  ngOnInit(): void {
    this.onClose = new Subject(); 
    this.getCatList();
    // this.getProdOneList();
    if (this.sendData) {
      this.model = this.sendData;
      this.modelId = this.model.itemID;
    }
  }

  getCatList(){
    this.apiService.getCatList().subscribe((data)=>{
      
      this.catList= data['data'];
      console.log(this.catList); 
    })
    }



  onSaveOrUpdate(form: NgForm) {
    if (this.modelId) {
      console.log("UPDATE",form); 
      this.update(form);
    } else {
      console.log("CREATE",form);
      this.create(form);
    } 
  }
   
  create(form: NgForm): void {
    console.log(this.model); // print room obj
    // this.customer.ssCreator= this.token.getUsername();
    
     
    this.apiService.saveSubCat(this.model).subscribe(
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
    console.log(this.model); // print room obj
   
  
    this.apiService.updateSubCat(this.model).subscribe(
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
