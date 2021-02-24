import { Component, OnInit, ViewChild } from '@angular/core';


import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../model/stockGroup.Model';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddSubCatComponent } from './sub-category/add-sub-cat/add-sub-cat.component';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
 
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  // @ViewChild(DataTableDirective, { static: false })
  @ViewChild('tabset') tabset: TabsetComponent;
  // @ViewChild(CategoryComponent) private pendingComponent: CategoryComponent;
  // @ViewChild(SubCategoryComponent) private sabcategory: SubCategoryComponent;
  // @ViewChild(MeasurementComponent) private measurement: MeasurementComponent;
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtOptionsSub: any = {};
  selectData: any;

  dtTrigger: Subject<any> = new Subject();
  bsModalRef: any;

  tabs: any[] = [
    { title: 'পোশাকের নাম ',  content: 'category', initiated : true, active: true },
    { title: 'সাবক্যাটেগরী' , content: 'subCategory', initiated : false,  active: false },
    { title: 'পোশাকের মাপ' , content: 'measurement', initiated : false, active: false },
    { title: 'পোশাকের মডেল নাম ' , content: 'itemModel', initiated : false, active: false },
    { title: 'পোশাকের ডিজাইন   ' , content: 'desingCat', initiated : false, active: false },
    { title: 'পোশাকের ডিজাইন মেজারমেন্ট  ' , content: 'desingSubCat', initiated : false, active: false }
    // { title: 'Report', content: 'report', initiated : false, active: false}
  ];
 
  constructor(
    private modalService: BsModalService,
    // public apiService: OrderService,
  ) { }

  ngOnInit(): void {
   
    // this.showgrid();
    // this.showgridCat();

  }


  // On select tab handler
  onSelect(data: any): void {
    console.log('Pathology Sample Pending emitting obj');
    if(data.content == "pending"){
     
    }
    console.log('Tabset tabs:',data);
  }

  getSelectedTab(selectedTabId:number): void{
    console.log('Pathology Sample Pending emitting obj',selectedTabId);
    // this.selectTab(selectedTabId);
  }

  selectTab(id){
    this.tabset.tabs[id].active = true;
  }


}