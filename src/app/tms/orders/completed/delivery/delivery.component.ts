import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
 
import { StockGroup } from '../../../model/stockGroup.Model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from '../../order/service/order.service';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  
  onClose: Subject<boolean>;
  purchaseDetailList: any[]=new Array();
  grandTotal= 0;
  groupList: StockGroup[];
  groupName: any;
  dtOptions: DataTables.Settings = {};
  constructor(
    public bsModalRef: BsModalRef,
    public apiService: OrderService,
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.getgList();   
    // this.getProdoneList();
    
  }

  public data = [
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: 'তাজনগর , রাণীপুকুর , মিঠাপুকুর , রংপুর ' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: 'তাজনগর , রাণীপুকুর , মিঠাপুকুর , রংপুর ' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: 'তাজনগর , রাণীপুকুর , মিঠাপুকুর , রংপুর ' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: 'তাজনগর , রাণীপুকুর , মিঠাপুকুর , রংপুর ' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: 'তাজনগর , রাণীপুকুর , মিঠাপুকুর , রংপুর ' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: 'তাজনগর , রাণীপুকুর , মিঠাপুকুর , রংপুর ' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: 'তাজনগর , রাণীপুকুর , মিঠাপুকুর , রংপুর ' },
     

  ];

  getgList() {
    // this.apiService.getProductGList().subscribe((data) => {
    //   console.log(data);
    //   // this.groupList = JSON.parse(data.results);
    //   // this.groupList= data['results'];
    //   // console.log(this.groupList);
    //   // console.log(this.prodOneList)
    // })
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


}
