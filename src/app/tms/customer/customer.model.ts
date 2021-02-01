import { BaseModel } from "../model/base.Model";

 

export class Customer extends BaseModel{

    cusId:Number;
    companyId:string;
    branchId:string;
    customerName:string;
    gender:string;
    mobile:string;
    address:string;
    

    // address:string;
    // mobile1:string;
    // mobile2:string;
    // email:string;
    // logo:string;
    // status:string;
}