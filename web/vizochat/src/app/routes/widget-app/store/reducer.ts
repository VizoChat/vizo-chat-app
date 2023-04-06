import { createReducer, on } from "@ngrx/store";
import { WidgetAppStateInterface } from "../models/widget.stateInterface";
import * as w_actions from './actions'

const initialState:WidgetAppStateInterface = {
    isLoading:false,
    isPageLoading:false,
    rooms:[],
    error:null,
    success:null,
    chats:[]
}

export const reducer = createReducer(
    initialState,
    on(w_actions.getChatRooms, (state)=>({...state, isPageLoading:true})),
    on(w_actions.gotChatRooms, (state, action)=>({...state,rooms:action.rooms, isPageLoading:false})),

    on(w_actions.newChatRoom, (state)=>({...state, isLoading:true,})),
    on(w_actions.createdChatRoom, (state, action)=>({...state , isLoading:false, rooms:[action.newData, ...state.rooms ]})),

    on(w_actions.getChats, (state)=>({...state, isLoading:true,})),
    on(w_actions.gotChats, (state, action)=>({...state , isLoading:false, chats:action.chats})),
    on(w_actions.gotNewChat, (state,action)=>({...state, isLoading:false, chats:[...state.chats,action.chat]})),
    
    on(w_actions.errorOnChatsRoom, (state, action)=>({...state, isLoading:false, error:action.error})),
    on(w_actions.clearErrorMsg, (state)=>({...state, isLoading:false, error:null})),
    on(w_actions.clearSuccessMsg, (state)=>({...state, isLoading:false, success:null})),
) 