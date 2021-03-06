import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../../model/stockGroup.Model';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-incomplited',
  templateUrl: './incomplited.component.html',
  styleUrls: ['./incomplited.component.css']
})
export class IncomplitedComponent implements OnInit {

 
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  selectData: any;

  dtTrigger: Subject<any> = new Subject();
  bsModalRef: any;
  constructor(
 
    public apiService: OrderService,
  ) { }

  ngOnInit(): void {
    // this.onClose = new Subject();
    // this.getgList();   
    // this.getProdoneList();
    this.showgrid();
  }

  public data = [
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    { tc: '255', doctorname: 'শাহ আবু  মুহাম্মদ  আক্তারুল আহসান মাসুদ ', qty: '০১৭৭৪২৫৪৯৮৮', total: '500', discount: '100',paid: '300', unpaid: '100' },
    
     

  ];


  showgrid() {
    let that = this;
    this.dtOptions = {
      processing: true,

      ajax: {
        url: `${environment.baseUrl}${environment.orderApiUrl}/order/list`,
        //url: 'http://localhost:8080/api/supplier/list',
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
          title: 'SL',
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
          title: 'কাস্টমার কোড', 
          data: 'customerCode',
          name: 'customerCode',
        },
        
        {
          title: 'অর্ডার আইডি ',
          data: 'orderNo',
          name: 'orderNo',
        },
        
        // {
        //   title: 'পোশাকের নাম',
        //   data: 'supMobile',
        //   name: 'supMobile',
        // },
        // {
        //   title: 'মূল্য',
        //   data: 'totalAmount',
        //   name: 'totalAmount',
        // },
        // {
        //   title: 'পরিমান',
        //   data: 'contactPerson',
        //   name: 'contactPerson',
        // },
        {
          title: 'মোটা মূল্য',
          data: 'totalAmount',
          name: 'totalAmount',
        },
        {
          title: 'আপডেট ডেট ',
          data: 'ssModifiedOn',
          render: (data) => {
            return moment(new Date(data)).format("DD/MM/YYYY").toString();
         },
          name: 'ssModifiedOn',
        },
        // {
        //   title: 'লম্বা',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'বডি',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'পুট',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'হাতা',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },

        // {
        //   title: 'কলার',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'মুহরি',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'কফ',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'হাতা',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'বোতাম',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        // {
        //   title: 'গলার কাজের মডেল',
        //   data: 'ssModifier',
        //   name: 'ssModifier',
        // },
        


        
         
        // {
        //   title: 'Status',
        //   data: 'status',
        //   name: 'status',
        // },
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


}
