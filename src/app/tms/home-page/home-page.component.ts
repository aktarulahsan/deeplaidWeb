import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddorderComponent } from '../addorder/addorder.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddordersComponent } from '../addorders/addorders.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    public http: HttpClient,
  ) { }
  public data = [
    { tc: '255', doctorname: 'cp-1323-subratohomoeo hall. bongkim chandra adhikari', qty: '12', total: '22991' },
    { tc: '255', doctorname: 'cp-1323-subratohomoeo hall. bongkim chandra adhikari', qty: '12', total: '22991' },
    { tc: '255', doctorname: 'cp-1323-subratohomoeo hall. bongkim chandra adhikari', qty: '12', total: '22991' },
    { tc: '255', doctorname: 'cp-1323-subratohomoeo hall. bongkim chandra adhikari', qty: '66', total: '22991' },
    { tc: '255', doctorname: 'cp-1323-subratohomoeo hall. bongkim chandra adhikari', qty: '12', total: '22991' },
    { tc: '255', doctorname: 'cp-1323-subratohomoeo hall. bongkim chandra adhikari', qty: '12', total: '22991' },
    { tc: '255', doctorname: 'cp-1323-subratohomoeo hall. bongkim chandra adhikari', qty: '12', total: '22991' },


  ];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  public getUsers() {
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(res => {
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

  addRole() {
    // this.getUsers();
    const initialState = {
      title: 'Add Role',
    };
    this.bsModalRef = this.modalService.show(AddordersComponent, {
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
