
import { user } from "./user.interface";

export interface UserAppStateInterface{
    user:user | null
    isLoading:boolean
    isPageLoading:boolean
    error:string|null 
    success:string|null
}