import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddDesignSubCategoryComponent } from './add-design-sub-category/add-design-sub-category.component';

@Component({
  selector: 'app-design-sub-category',
  templateUrl: './design-sub-category.component.html',
  styleUrls: ['./design-sub-category.component.css']
})
export class DesignSubCategoryComponent implements OnInit {

 
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

        url: `${environment.baseUrl}tms/designSubCategory/list`,

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
          title: 'ডিজাইন আইডি',
          data: 'designCategoryId',
          name: 'designCategoryId',
        },
        {
          title: 'ডিজাইন মেজারমেন্ট  ',
          data: 'measurement',
          name: 'measurement',
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
      title: 'অ্যাড  ডিজাইন মেজারমেন্ট ',
    };
    this.bsModalRef = this.modalService.show(AddDesignSubCategoryComponent, {
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
        title: 'আপডেট ডিজাইন মেজারমেন্ট  ',
        sendData: this.selectData,
      };
      this.bsModalRef = this.modalService.show(AddDesignSubCategoryComponent, {
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
