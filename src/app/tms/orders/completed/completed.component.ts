import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../../model/stockGroup.Model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeliveryComponent } from './delivery/delivery.component';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
 
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  selectData: any;

  dtTrigger: Subject<any> = new Subject();
  bsModalRef: any;
  constructor(
    private modalService: BsModalService,
    public apiService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
     
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
        //   "orderable": false,
        //   render: (data, type, row) => {
        //     return '<button type="button" class="btn btn-info fontsize update-slot">Update</button>';
        //   }
        // },
        // {
        //   "orderable": false,
        //   render: (data, type, row) => {
        //     return '<button type="button" class="btn btn-danger fontsize cencel-sloat" >Cancel</button>';
        //   }
        // }

        
         
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
        $(row).find(".update-slot").click(function () {
          that.deliver();
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


  deliver( ) {
   if(this.selectData){
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
   }else {
    this.toastr.warning("Select Order")
  }
  }

 


}
