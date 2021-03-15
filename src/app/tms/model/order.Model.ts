import { DesignCategoryModel } from "../setting/model/designCategory.Model";
import { MeasurementModel } from "../setting/model/measurement.Model";
import { BaseModel } from "./base.Model";
import { OrderAccountDetails } from "./orderAccountDetails.Model";
 
import { OrderDetailsModel } from "./orderDetails.Model";
import { OrderDetailsModels } from "./orderDetailsModel.Model";

export class OrderModel extends BaseModel {

   
     orderNo: number;
     customerCode: number;
     orderDate: Date;
     deliveryDate: Date;
     totalAmount: number;
     adAmunt: number;
     designModel: string;
     status: number;
     worker: string;
     comments: string;
     baki: number;

     orderDetailList: OrderDetailsModel[]=new Array();
     orderAccountDetails: OrderAccountDetails;
     ordermeasurementList:MeasurementModel[]= new Array();
     orderAccountDetailsList:OrderAccountDetails[]= new Array();
     designCategoryModelList: DesignCategoryModel[]= new Array();
     detailsList: OrderDetailsModels[]= new Array();

}