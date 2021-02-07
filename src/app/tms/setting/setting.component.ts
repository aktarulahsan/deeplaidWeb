import { Component, OnInit, ViewChild } from '@angular/core';


import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../model/stockGroup.Model';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddSubCatComponent } from './add-sub-cat/add-sub-cat.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtOptionsSub: any = {};
  selectData: any;

  dtTrigger: Subject<any> = new Subject();
  bsModalRef: any;

 
  constructor(
    private modalService: BsModalService,
    // public apiService: OrderService,
  ) { }

  ngOnInit(): void {
   
    this.showgrid();
    this.showgridCat();

  }

  public data = [
    { tc: 'পাঞ্জাবী   ', doctorname: 'হুজুর  ' },
    { tc: '  শাড়ী   ', doctorname: 'দীপিকা' },
    { tc: '  শার্ট  ', doctorname: 'সালমান ' },
    { tc: '  পেন্ট ', doctorname: 'পিকে  ' },


  ];


  showgrid() {
    let that = this;

    this.dtOptions = {
      processing: true,

      ajax: {

        url: `${environment.baseUrl}tms/category/list`,

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
          title: 'পোশাকের  নাম',
          data: 'customerName',
          name: 'customerName',
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


  showgridCat() {
    let that = this;

    this.dtOptionsSub = {
      processing: true,

      ajax: {

        url: `${environment.baseUrl}tms/customer/list`,

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
          title: 'পোশাকের  নাম',
          data: 'customerName',
          name: 'customerName',
        },
        {
          title: 'পোশাকের মডেলের নাম  ',
          data: 'customerName',
          name: 'customerName',
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


  onSaveOrUpdate(form: NgForm) {

  }

  addCategory() {
    const initialState = {
      title: 'Add Customer ',
    };
    this.bsModalRef = this.modalService.show(AddcategoryComponent, {
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

  updateCategory() {
    if (this.selectData) {
      const initialState = {
        title: 'Customer Supplier',
        sendData: this.selectData,
      };
      this.bsModalRef = this.modalService.show(AddcategoryComponent, {
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



  addSubCategory() {
    const initialState = {
      title: 'Add Customer ',
    };
    this.bsModalRef = this.modalService.show(AddSubCatComponent, {
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

  updateSubCategory() {
    if (this.selectData) {
      const initialState = {
        title: 'Customer Supplier',
        sendData: this.selectData,
      };
      this.bsModalRef = this.modalService.show(AddSubCatComponent, {
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