
import { channels } from "./channels.interface";
import { chatRooms, chats } from "./chat.interface";
import { teammates } from "./teammates.interface";
import { user } from "./user.interface";

export interface UserAppStateInterface{
    user:user | null
    isLoading:boolean
    isContentLoading:boolean
    isPageLoading:boolean
    error:string|null 
    success:string|null
    channels?:channels[]
    chatRooms:chatRooms[]
    teammates?:teammates[]
    chats:chats[]
}