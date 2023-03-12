import { UserModelInterface } from "src/app/shared/models/user.interface";

export interface AuthenticationStateInterface{
    isLogged:Boolean;
    isLoading:Boolean,
    error:String|null;
}