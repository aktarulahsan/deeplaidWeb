import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  sendData: any;
  customerCode:any;
  selectData: any;

  dtTrigger: Subject<any> = new Subject();
  bsModalRef: any;
  customerList: Customer[];
  customer: Customer= new Customer();
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public customerService: CustomerService,
    
 
  ) { }

//   constructor(public router: Router, public route: ActivatedRoute){}
// route.params.subscribe(params => {
//         let data = params['data']
//     });

  ngOnInit(): void {
    this.getCustomerList();
   

    this.customerCode= this.route.snapshot.paramMap.get('customerCode');
    console.log('data Param', this.customerCode);
    if(this.customerCode){
      this.showgrid(this.customerCode);
      this.selectCustomer(this.customerCode);
    }
           
    
    // if(this.sendData){
    //   this.id= this.sendData.cusId;
    // }
    // this.getgList();   
    // this.getProdoneList();
    
  }


  showgrid(customerCode) {
    let that = this;
   // this.url = environment.baseUrl + environment.orderApiUrl+"/"+'branch/list';
    this.dtOptions = {
      processing: true,
      
      ajax: {
      
        url: `${environment.baseUrl}tms/order/orderList`,
        // url: `${environment.baseUrl}${environment.orderApiUrl}/prodl/list`,
        type: 'GET',

        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        },

        data: function (sendData) {
          console.log('data customerCode Param', customerCode);
          sendData.customerCode = that.customerCode;
          // console.log('data Param', sendData);
          // sendData.floorNo = that.selectedFloor.id
        },
    
        dataSrc: function (response) {
          response.draw = response.draw;
          console.log('request.responseText', response);
          response.recordsTotal = response.recordsTotal;
          response.recordsFiltered = response.recordsFiltered;
          return response.items;
        },
        error: function (request) {
          console.log('request.responseText', request.responseText);
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

        // {
        //   title: 'কাস্টমার কোড', 
        //   data: 'customerCode',
        //   name: 'customerCode',
        // },
        
        {
          title: 'অর্ডার আইডি ',
          data: 'orderNo',
          name: 'orderNo',
        },
        {
          title: 'মোটা মূল্য',
          data: 'totalAmount',
          name: 'totalAmount',
        },
        
        {
          title: 'ক্রিয়েট  ডেট ',
          data: 'ssCreatedOn',
          render: (data) => {
            return moment(new Date(data)).format("DD/MM/YYYY").toString();
         },
          name: 'ssCreatedOn',
        },
        {
          title: 'আপডেট ডেট ',
          data: 'ssModifiedOn',
          render: (data) => {
            return moment(new Date(data)).format("DD/MM/YYYY").toString();
         },
          name: 'ssModifiedOn',
        },
        {
          title: 'Action',
          "orderable": false,
          render: (data: any, type: any, row: any) => {
             
            
            return '<button type="button"   class="btn btn-info fontsize  details-sloat">Details</button>';
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
          $(row).find(".details-sloat").click(function () {
            that.printData();
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

  showCertificate() {
    // let reportObj: EwvmCertificateModel = res.obj
    const data ={
      "layout":"1",
      "client":"ewvm",
      "reportData":"reportObj"
    }
    
    this.customerService.generateCertificate(data).subscribe(
      res => {
        let file = new Blob([res], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      err => {
        console.log("Error occured in Certificate generation", err," reportObj");
      })
  }

  printData(){
    this.customerService.viewReportRole().subscribe(
      res => {
        // console.log('create ', resp);
          this.toastr.success('', 'Update Successfull');
          this.bsModalRef.hide();
      },
      err => {
        console.log("create err: ",err);
        this.toastr.warning('', 'Error occured');
      }
    );
  }

  getCustomerList(){
    this.customerService.getCustomerList().subscribe((data)=>{
      
      this.customerList= data['data'];
      console.log(this.customerList); 
    })
    }

    selectCustomer(customer):any{  
      console.log(customer); 

      this.customerService.checkCustomerID(customer).subscribe((data)=>{
      
        this.customer = data['obj'];
        console.log(this.customerList); 
      })
       
  
      // if(customer !=null){
      //     this.orderModel.customerCode = customer.customerCode;
          
         
      // }
    }

}
