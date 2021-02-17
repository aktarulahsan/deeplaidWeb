import { MeasurementModel } from "../setting/model/measurement.Model";
import { BaseModel } from "./base.Model";
import { OrderAccountDetails } from "./orderAccountDetails.Model";
 
import { OrderDetailsModel } from "./orderDetails.Model";

export class OrderModel extends BaseModel {

   
     orderNo: number;
     customerCode: number;
     orderDate: Date;
     deliveryDate: Date;
     totalAmount: number;
     designModel: String;
     status: number;

     orderDetailList: OrderDetailsModel[]=new Array();
     orderAccountDetails: OrderAccountDetails;
     ordermeasurementList:MeasurementModel[]= new Array();
     orderAccountDetailsList:OrderAccountDetails[]= new Array();

}