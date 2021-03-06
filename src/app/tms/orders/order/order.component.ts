import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  selectData: any;

  dtTrigger: Subject<any> = new Subject();
  bsModalRef: any;

  constructor(
    public router: Router,
    public apiService: OrderService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

    this.showgrid();
    
  }



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
          title: 'অর্ডার ডেট ',
          data: 'ssCreatedOn',
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
        //   title: 'Action',
        //   "orderable": false,
        //   render: (data: any, type: any, row: any) => {
        //     return '<button type="button"   class="btn btn-info fontsize  details-sloat">Details</button>';
        //   }
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
        $(row).find(".details-sloat").click(function () {
          // that.showDetails();
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
  addBranch() {
    const initialState = {
      title: 'Add Supplier ',
    };
    this.bsModalRef = this.modalService.show(AddOrdersComponent, {
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

  updateBranch() {
    if(this.selectData){
    const initialState = {
      title: 'Update Supplier',
      sendData: this.selectData,
    };
    this.bsModalRef = this.modalService.show(AddOrdersComponent, {
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



  
  orderPrint() {
    // let reportObj: EwvmCertificateModel = res.obj
    const data ={
      "orderNo":this.selectData.orderNo,
      "client":"ewvm",
      "reportData":"reportObj"
    }
    
    this.apiService.orderPrint(data).subscribe(
      res => {
        let file = new Blob([res], { type: 'application/pdf' });
        
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      err => {
        console.log("Error occured in Certificate generation", err," reportObj");
      })
  }




  showDetails(){
    var orderNo = this.selectData;
    console.log('Selectedeeeeeeeeeeeeeeeeeeeeeeeeee User ', orderNo);
    if(orderNo){
      const initialState={
        title: 'Order Status ',
        sendData: this.selectData,
      }
        this.router.navigate(['/orderDetails', { 'customerCode': this.selectData.customerCode,'orderNo': this.selectData.orderNo, }]);
    }else{
        this.toastr.warning('', "Please select a patient"); 
    }
  }

}
