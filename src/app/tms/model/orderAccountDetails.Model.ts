import { MeasurementModel } from "../setting/model/measurement.Model";
import { BaseModel } from "./base.Model";
import { OrderDetailsModel } from "./orderDetails.Model";

export class OrderAccountDetails extends BaseModel {

   
     id: number;
     orderMaserNo: number;
     itemsCode: number;
     itemRate: number;
     qty: number = 1;
     itemTotalAmount: number;
     designModel: string;

     ordermeasurementList:OrderDetailsModel[]= new Array();

}