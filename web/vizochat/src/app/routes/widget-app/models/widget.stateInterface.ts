import { chats } from "./chats.interface";
import { channel, rooms } from "./rooms.interface";

export interface WidgetAppStateInterface {
    rooms:rooms[],
    isLoading:boolean,
    isPageLoading:boolean,
    error:string | null,
    success:string | null,
    chats:chats[]
    channel:channel
} 

