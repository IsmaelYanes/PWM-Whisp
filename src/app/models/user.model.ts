export interface UserModel {
  id?:string;
  name?:string;
  email:string;
  birthday:string;
  profilePhoto:string;
  contact?:number[];
  request?:number[];
  chat?:{[key:string]:number[]};
}
