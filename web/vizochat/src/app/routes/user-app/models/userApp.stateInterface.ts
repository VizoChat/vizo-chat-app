import { user } from "./userApp.interface";

export interface UserAppStateInterface{
    user:user | null
    isLoading:boolean
    isPageLoading:boolean
    error:string|null
}