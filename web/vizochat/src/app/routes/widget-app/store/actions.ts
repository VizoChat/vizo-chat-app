import { createAction, props } from "@ngrx/store";

export const getChatRooms = createAction('[WidgetApp] get chat rooms', props<{data:any}>())
export const gotChatRooms = createAction('[WidgetApp] got chat rooms', props<{rooms:any}>())

export const newChatRoom = createAction('[WidgetApp] create new chat room', props<{data:any}>())
export const createdChatRoom = createAction('[WidgetApp] created new chat room',props<{newData:any}>())

export const errorOnChatsRoom = createAction('[WidgetApp] got chat rooms',props<{error:string}>())
export const clearErrorMsg = createAction('[WidgetApp] clear errors')
export const clearSuccessMsg = createAction('[WidgetApp] clear errors')
