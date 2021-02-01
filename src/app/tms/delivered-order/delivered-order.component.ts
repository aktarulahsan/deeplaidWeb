import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../model/stockGroup.Model';
import { BsModalService } from 'ngx-bootstrap/modal';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { DeliveryComponent } from '../completed/delivery/delivery.component';
@Component({
  selector: 'app-delivered-order',
  templateUrl: './delivered-order.component.html',
  styleUrls: ['./delivered-order.component.css']
})
export class DeliveredOrderComponent implements OnInit {

  
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  
  purchaseDetailList: any[]=new Array();
  grandTotal= 0;
  dtTrigger: Subject<any> = new Subject();
  groupList: StockGroup[];
  groupName: any;
  dtOptions: DataTables.Settings = {};
  bsModalRef: any;
  selectData: any;
  constructor(
    private modalService: BsModalService,
    public apiService: OrderService,
  ) { }

  ngOnInit(): void {
     
    
    
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
 

  // showgrid() {
  //   let that = this;
  //  // this.url = environment.baseUrl + environment.orderApiUrl+"/"+'branch/list';
  //   this.dtOptions = {
  //     processing: true,
      
  //     ajax: {
      
  //       url: `${environment.baseUrl}${environment.orderApiUrl}/branch/list`,
  //       type: 'GET',

  //       beforeSend: function (xhr) {
  //         xhr.setRequestHeader('Content-Type', 'application/json');
  //       },

  //       data: function (sendData) {
  //         // console.log('data Param', sendData);
  //         // sendData.floorNo = that.selectedFloor.id
  //       },
  //       error: function (request) {
  //         console.log('request.responseText', request.responseText);
  //       },
  //       dataSrc: function (response) {
  //         response.draw = response.data.draw;
  //         console.log('request.responseText', response);
  //         response.recordsTotal = response.data.recordsTotal;
  //         response.recordsFiltered = response.data.recordsFiltered;
  //         return response.data;
  //       },
  //     },

  //     order: [[0, 'asc']],
  //     columns: [
  //       {
  //         title: 'SL',
  //         render: function (
  //           data: any,
  //           type: any,
  //           row: any,
  //           meta: { row: number }
  //         ) {
  //           return '<span>' + (meta.row + 1) + '</span>';
  //         },
  //       },

  //       {
  //         title: 'Branch ID', 
  //         data: 'branchID',
  //         name: 'branchID',
  //       },
        
  //       {
  //         title: 'Branch Name',
  //         data: 'bname',
  //         name: 'bname',
  //       },
  //       {
  //         title: 'Address',
  //         data: 'address',
  //         name: 'address',
  //       },
  //       {
  //         title: 'Mobile',
  //         data: 'mobile1',
  //         name: 'mobile1',
  //       },
  //       {
  //         title: 'Phone',
  //         data: 'mobile1',
  //         name: 'mobile1',
  //       },
  //       {
  //         title: 'Email',
  //         data: 'email',
  //         name: 'email',
  //       },
       
  //       {
  //         title: 'Created By',
  //         data: 'ssCreator',
  //         name: 'ssCreator',
  //       },
  //       {
  //         title: 'Created Date',
  //         data: 'ssModifiedOn',
  //         render: (data) => {
  //           return moment(new Date(data)).format("DD/MM/YYYY").toString();
  //        },
  //         name: 'ssModifiedOn',
  //       },
  //       {
  //         title: 'Update By',
  //         data: 'ssModifier',
  //         name: 'ssModifier',
  //       },
        
  //       {
  //         title: 'Update Date',
  //         data: 'ssCreatedOn',
  //         render: (data) => {
  //           return moment(new Date(data)).format("DD/MM/YYYY").toString();
  //         },
  //         name: 'ssCreatedOn',
  //       },
       
  //       {
  //         title: 'Status',
  //         data: 'status',
  //         name: 'status',
  //       },


       
  //     ],
  //     responsive: true,
  //     select: true,
  //     rowCallback: (row: Node, data: any | Object) => {
  //       const self = this;
  //       $(row)
  //         .find('.booked-sloat')
  //         .click(function () {
  //           console.log('hello delete data', data);
  //           that.rerender();
  //         });

  //       $(row).bind('click', () => {
  //         this.selectData = data;
        
  //         console.log('Selected User ', this.selectData);
  //       });

  //       return row;
  //     },
  //   };
  // }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  deliver() {
    const initialState = {
      title: 'Add Branch ',
    };
    this.bsModalRef = this.modalService.show(DeliveryComponent, {
      class: 'modal-lg',
      initialState,
      backdrop: 'static',
    });
    this.bsModalRef.content.onClose.subscribe((data) => {
      if (data == true) {
        // this.rerender();
      }
    });
  }

 


}
