import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../model/stockGroup.Model';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddCustomerComponent } from './add-customer/add-customer.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  selectData: any;

  dtTrigger: Subject<any> = new Subject();
  bsModalRef: any;

  constructor(
    
    private modalService: BsModalService,
 
  ) { }

  ngOnInit(): void {
    // this.onClose = new Subject();
    this.showgrid();
    // this.getgList();   
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


  
  showgrid() {
    let that = this;
   // this.url = environment.baseUrl + environment.orderApiUrl+"/"+'branch/list';
    this.dtOptions = {
      processing: true,
      
      ajax: {
      
        url: `${environment.baseUrl}tms/customer/list`,
        // url: `${environment.baseUrl}${environment.orderApiUrl}/prodl/list`,
        type: 'GET',

        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        },

        data: function (sendData) {
          // console.log('data Param', sendData);
          // sendData.floorNo = that.selectedFloor.id
        },
        error: function (request) {
          console.log('request.responseText', request.responseText);
        },
        dataSrc: function (response) {
          response.draw = response.data.draw;
          console.log('request.responseText', response);
          response.recordsTotal = response.data.recordsTotal;
          response.recordsFiltered = response.data.recordsFiltered;
          return response.data;
        },
      },

      order: [[0, 'asc']],
      columns: [
        {
          title: 'ক্রমিক নং',
          render: function (
            data: any,
            type: any,
            row: any,
            meta: { row: number }
          ) {
            return '<span>' + (meta.row + 1) + '</span>';
          },
        },

        {
          title: 'ক্রেতার নাম', 
          data: 'customerName',
          name: 'customerName',
        },
        
        {
          title: 'মোবাইল নম্বর',
          data: 'mobile',
          name: 'mobile',
        },
        {
          title: 'ঠিকানা',
          data: 'address',
          name: 'address',
        },
        {
          title: 'Action',
          "orderable": false,
          render: (data: any, type: any, row: any) => {
            return '<button type="button"   class="fas fa-edit fontsize  details-sloat">Details</button>';
          }
        },

       
      ],
      responsive: true,
      select: true,
      rowCallback: (row: Node, data: any | Object) => {
        const self = this;
        $(row)
          .find('.booked-sloat')
          .click(function () {
            console.log('hello delete data', data);
            that.rerender();
          });

        $(row).bind('click', () => {
          this.selectData = data;
        
          console.log('Selected User ', this.selectData);
        });

        return row;
      },
    };
  }

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

  getgList() {
    // this.apiService.getProductGList().subscribe((data) => {
    //   console.log(data);
    //   // this.groupList = JSON.parse(data.results);
    //   // this.groupList= data['results'];
    //   // console.log(this.groupList);
    //   // console.log(this.prodOneList)
    // })
  }
 
  add() {
    const initialState = {
      title: 'Add Customer ',
    };
    this.bsModalRef = this.modalService.show(AddCustomerComponent, {
      class: 'modal-lg',
      initialState,
      backdrop: 'static',
    });
    this.bsModalRef.content.onClose.subscribe((data) => {
      if (data == true) {
        this.rerender();
      }
    });
  }

  update() {
    if(this.selectData){
    const initialState = {
      title: 'Customer Supplier',
      sendData: this.selectData,
    };
    this.bsModalRef = this.modalService.show(AddCustomerComponent, {
      class: 'modal-lg',
      initialState,
      backdrop: 'static',
    });
    this.bsModalRef.content.onClose.subscribe((data) => {
      if (data == true) {
        this.rerender();
      }
    });
  }
  }




}
