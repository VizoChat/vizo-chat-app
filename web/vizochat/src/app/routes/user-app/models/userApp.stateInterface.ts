
import { channels } from "./channels.interface";
import { user } from "./user.interface";

export interface UserAppStateInterface{
    user:user | null
    isLoading:boolean
    isContentLoading:boolean
    isPageLoading:boolean
    error:string|null 
    success:string|null
    channels?:channels[]
    chatRooms?:any[]
}