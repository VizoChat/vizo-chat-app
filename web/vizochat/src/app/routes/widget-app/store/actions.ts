import { createAction, props } from "@ngrx/store";
import { chats } from "../models/chats.interface";

export const newWUser = createAction('[WidgetApp] create new w user', props<{data:any}>())
export const createWUser = createAction('[WidgetApp] created w user',)

export const getChatRooms = createAction('[WidgetApp] get chat rooms', props<{data:any}>())
export const gotChatRooms = createAction('[WidgetApp] got chat rooms', props<{rooms:any}>())

export const newChatRoom = createAction('[WidgetApp] create new chat room', props<{data:any}>())
export const createdChatRoom = createAction('[WidgetApp] created new chat room',props<{newData:any}>())

export const getChats = createAction('[WidgetApp] get chats', props<{data:{apiKey:string,chatId:string}}>())
export const gotChats = createAction('[WidgetApp] got chats',props<{chats:chats[]}>())
export const gotNewChat = createAction('[WidgetApp] got new chat',props<{chat:chats}>())

export const errorOnChatsRoom = createAction('[WidgetApp] got chat rooms',props<{error:string}>())
export const clearErrorMsg = createAction('[WidgetApp] clear errors')
export const clearSuccessMsg = createAction('[WidgetApp] clear errors')
