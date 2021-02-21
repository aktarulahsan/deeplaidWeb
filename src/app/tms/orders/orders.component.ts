import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild('tabset') tabset: TabsetComponent;

  
  tabs: any[] = [
    { title: 'অর্ডার  ডিটেলস ',  content: 'order', initiated : true, active: true },
    { title: 'ইনকমপ্লিট  অর্ডার ' , content: 'incomplete', initiated : false,  active: false },
    { title: 'কমপ্লিট অর্ডার' , content: 'completed', initiated : false, active: false },
    { title: 'ডেলিভার্ড  অর্ডার' , content: 'deliveredorder', initiated : false, active: false }
    // { title: 'Report', content: 'report', initiated : false, active: false}
  ];
 


  constructor() { }

  ngOnInit(): void {
  }


  onSelect(data: any): void {
    console.log('Pathology Sample Pending emitting obj');
    if(data.content == "pending"){
     
    }
    console.log('Tabset tabs:',data);
  }

  getSelectedTab(selectedTabId:number): void{
    console.log('Pathology Sample Pending emitting obj',selectedTabId);
    // this.selectTab(selectedTabId);
  }

  selectTab(id){
    this.tabset.tabs[id].active = true;
  }

}
