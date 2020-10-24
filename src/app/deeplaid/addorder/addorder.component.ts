import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
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

  public data = [
    {group: 'Unani', itemn: 'Dp kohos', qty:'12', total:'22991'},
    {group: 'Harbal', itemn: 'laxova Sachet', qty:'12', total:'22991'},
    {group: 'Homeo', itemn: 'Penaxlaid', qty:'12', total:'22991'},
    {group: 'Unani', itemn: 'Dp kohos', qty:'12', total:'22991'},
    {group: 'Harbal', itemn: 'laxova Sachet', qty:'12', total:'22991'},
    {group: 'Homeo', itemn: 'Penaxlaid', qty:'12', total:'22991'},
    
    {group: 'Unani', itemn: 'Dp kohos', qty:'12', total:'22991'},
    {group: 'Harbal', itemn: 'laxova Sachet', qty:'12', total:'22991'},
    {group: 'Homeo', itemn: 'Penaxlaid', qty:'12', total:'22991'},
    
     
];

dtOptions: DataTables.Settings = {};

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
   
    this.onClose = new Subject();
  }

  onSaveOrUpdate(form: NgForm) {
    
  }


}
