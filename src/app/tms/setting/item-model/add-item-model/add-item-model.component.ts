import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CategoryModel } from '../../model/category.Model';
import { ItemEntity } from '../../model/itemEntity.Model';
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-add-item-model',
  templateUrl: './add-item-model.component.html',
  styleUrls: ['./add-item-model.component.css']
})
export class AddItemModelComponent implements OnInit {
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
  isReadOnly: boolean =false;
  model: ItemEntity = new ItemEntity;
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
      this.isReadOnly = true;
      this.model = this.sendData;
      this.modelId = this.model.itemId;
    }
  }

  getCatList(){
    this.apiService.getSubCatList().subscribe((data)=>{
      
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
    
     
    this.apiService.saveItemModel(this.model).subscribe(
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
   
  
    this.apiService.updateItemModel(this.model).subscribe(
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
