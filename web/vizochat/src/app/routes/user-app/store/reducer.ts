import { createReducer, on } from "@ngrx/store";
import { UserAppStateInterface } from "../models/userApp.stateInterface"; 
import * as UserAppActions from "./actions"

const initialState:UserAppStateInterface = {
    isLoading:false,
    isPageLoading:false,
    user:null,
    error:null,
    success:null
}
export const reducer = createReducer(
    initialState,
    on(UserAppActions.getUser, (state)=>({...state,isPageLoading:true})),
    on(UserAppActions.gotUser, (state, action)=>({...state,isPageLoading:false,user:action.user, error:null})),
    on(UserAppActions.errorGettingUser, (state, action)=>({...state, error:action.error})),

    on(UserAppActions.newChannel,(state)=>({...state,isLoading:true})),
    on(UserAppActions.createdChannel,(state, action)=>({...state,isLoading:false, success:action.successMessage})),
    on(UserAppActions.errorChannel,(state, action)=>({...state,isLoading:false, error:action.errorMessage})),

    on(UserAppActions.clearSuccessMsg, (state)=>({...state,success:null})),
    on(UserAppActions.clearErrorMsg, (state)=>({...state,error:null}))
)