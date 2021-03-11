import { DesignCategoryModel } from "../setting/model/designCategory.Model";
import { MeasurementModel } from "../setting/model/measurement.Model";
import { BaseModel } from "./base.Model";
import { OrderDetailsModel } from "./orderDetails.Model";
import { OrderDetailsModels } from "./orderDetailsModel.Model";

export class OrderAccountDetails extends BaseModel {

   
     id: number;
     orderMaserNo: number;
     itemId: number;
     itemRate: number;
     itemName: string;
     qty: number = 1;
     itemTotalAmount: number;
     designModel: string;

     ordermeasurementList:OrderDetailsModel[]= new Array();
     designCategoryModelList: DesignCategoryModel[]= new Array();
     detailsModel: OrderDetailsModels =new OrderDetailsModels();


}