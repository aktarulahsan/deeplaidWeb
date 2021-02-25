import { BaseModel } from "../../model/base.Model";
import { DesignSubCategoryModel } from "./desingSubCategory.Model";

export class DesignCategoryModel extends BaseModel{


     designCategoryId: number;
     desingName: string;
     satatus: number;
     designSubCategoryId:number;

     designSubCategoryModelList: DesignSubCategoryModel[]=new Array();


}