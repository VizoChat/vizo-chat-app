import { createReducer, on } from "@ngrx/store";
import { UserAppStateInterface } from "../models/userApp.stateInterface";
import * as UserAppActions from "./actions"

const initialState:UserAppStateInterface = {
    isLoading:false,
    isPageLoading:false,
    user:null,
    error:null
}
export const reducer = createReducer(
    initialState,
    on(UserAppActions.getUser, (state)=>({...state,isPageLoading:true})),
    on(UserAppActions.gotUser, (state, action)=>({...state,isPageLoading:false,user:action.user})),
    on(UserAppActions.errorGettingUser, (state, action)=>({...state, error:action.error})),
)