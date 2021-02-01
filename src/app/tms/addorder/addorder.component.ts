import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { StockGroup } from '../model/stockGroup.Model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map'


@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css'],
})
export class AddorderComponent implements OnInit {


  onClose: Subject<boolean>;
  title: any;
  sendRole: any;

  itemss = [
    { id: 1, name: 'Dp kohos' },
    { id: 2, name: 'laxova Sachet' },
    { id: 3, name: 'Penaxlaid' },
  ];
  groups = [
    { id: 1, gname: 'Unani' },
    { id: 2, gname: 'Harbal' },
    { id: 3, gname: 'Homeo' },
  ];
  customer = [
    { id: 1, cname: 'Dr. gologk chandro' },
    { id: 2, cname: 'Dr. kumaresh' },
    { id: 3, cname: 'Dr. kamal' },
  ];

  public datasse = [
    { group: 'Unani', itemn: 'Dp kohos', qty: '12', total: '22991' },
    { group: 'Harbal', itemn: 'laxova Sachet', qty: '12', total: '22991' },
    { group: 'Homeo', itemn: 'Penaxlaid', qty: '12', total: '22991' },
    { group: 'Unani', itemn: 'Dp kohos', qty: '12', total: '22991' },
    { group: 'Harbal', itemn: 'laxova Sachet', qty: '12', total: '22991' },
    { group: 'Homeo', itemn: 'Penaxlaid', qty: '12', total: '22991' },

    { group: 'Unani', itemn: 'Dp kohos', qty: '12', total: '22991' },
    { group: 'Harbal', itemn: 'laxova Sachet', qty: '12', total: '22991' },
    { group: 'Homeo', itemn: 'Penaxlaid', qty: '12', total: '22991' },


  ];

  groupList: StockGroup[];
  dtOptions: DataTables.Settings = {};

  users: any;
  constructor(
    public bsModalRef: BsModalRef,
    public apiService: OrderService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.users = [];
    this.onClose = new Subject();
    // this.getUsers();
    // this.getgList();
    // this.getgList()
    // this.getGroupList();
  }

  onSaveOrUpdate(form: NgForm) {

  }

  public getUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    var url = 'StockGroup';
    console.log(url);
    this.http.post(url, httpOptions).subscribe(res => {
      // this.users = res;
      // console.log(this.users);
      console.log(res);
      // data contains actual array of users
    }, err => {
      console.log(err);
    }, () => {
      console.log('completed');
    }
    );
  }




  // getgList() {
  //   this.apiService.getProductGList().subscribe((data) => {
  //     console.log(data.results);
  //     // this.groupList = JSON.parse(data.results);
  //     this.groupList= data['results'];
  //     console.log(this.groupList);
  //     // console.log(this.prodOneList)
  //   })
  // }

  // getGroupList(){
  //   console.log("data");

  //   this.users = this.http.get('http://182.160.126.21:8082/api/StockGroup')
  //   console.log(this.users);

  //   // this.apiService.getGroupList().subscribe((data)=>{
  //   //   // console.log(data);
  //   //   this.groupList= data;
  //   //   console.log( this.groupList);
  //   // })
  //   }

}
