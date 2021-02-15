import { BaseModel } from "./base.Model";
import { OrderDetailsModel } from "./orderDetails.Model";

export class OrderAccountDetails extends BaseModel {

   
     orderADetailsNo: number;
     orderMaserNo: number;
     itemsCode: number;
     itemRate: number;
     qty: number = 1;
     itemTotalAmount: number;

}