

export class BaseResponse{


  success :boolean;
  info : boolean;
  warning: boolean;
  message : string;
  valid : boolean;
  id: Number;
  model:  Map<String,Object>;
  data: [];
  items: [];
  obj: Object;

}