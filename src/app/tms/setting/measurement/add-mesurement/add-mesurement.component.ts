import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MeasurementModel } from '../../model/measurement.Model';
import { SubCategoryModel } from '../../model/subCategory.Model';
import { SettingService } from '../../service/setting.service';
import { MesurementService } from '../service/mesurement.service';

@Component({
  selector: 'app-add-mesurement',
  templateUrl: './add-mesurement.component.html',
  styleUrls: ['./add-mesurement.component.css']
})
export class AddMesurementComponent implements OnInit {

  
  onClose: Subject<boolean>;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  title: any;
  subcatList: SubCategoryModel[];
  sendData: any;
  isReadOnly: boolean =false;
  measurementModel: MeasurementModel = new MeasurementModel;
  measurementId: any;

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
      this.measurementModel = this.sendData;
      this.measurementId = this.measurementModel.measurementId;
    }
  }

  getItemList(){
    this.settingService.getSubCatList().subscribe((data)=>{
      
      this.subcatList= data['data'];
      console.log(this.subcatList); 
    })
    }

  
  onSaveOrUpdate(form: NgForm) {
    if (this.measurementId) {
      console.log("UPDATE",form); 
      this.updatemesurment(form);
    } else {
      console.log("CREATE",form);
      this.savemesurment(form);
    } 
  }
   
  savemesurment(form: NgForm): void {
    console.log(this.measurementModel); // print room obj
    // this.customer.ssCreator= this.token.getUsername();
    
     
    this.apiService.savemesurment(this.measurementModel).subscribe(
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
    console.log(this.measurementModel); // print room obj
    // this.customer.ssModifier= this.token.getUsername();
  
    this.apiService.updatemesurment(this.measurementModel).subscribe(
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
