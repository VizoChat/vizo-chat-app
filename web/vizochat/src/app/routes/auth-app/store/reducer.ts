import { createReducer, on } from "@ngrx/store"
import { AuthenticationStateInterface } from "../models/authentication.stateInterface"
import * as AuthActions from './actions'

const initialState: AuthenticationStateInterface = {
    isLoading:false,
    isLogged:false,
    error:null

}

export const reducer = createReducer(initialState, 
    on(AuthActions.doLogin, (state)=>({...state,isLoading:true, error:null})),
    on(AuthActions.doSignup, (state)=>({...state,isLoading:true, error:null})),
    on(AuthActions.doGLogin, (state)=>({...state,isLoading:true, error:null})),
    on(AuthActions.doGSignup, (state)=>({...state,isLoading:true, error:null})),
    on(AuthActions.doLoginSuccess, (state)=>({...state,isLoading:false, isLogged:true})),
    on(AuthActions.doLoginFailure, (state, action)=>({...state,isLoading:false, error:action.error})),
    on(AuthActions.doLoginFailureClear, (state)=>({...state, error:null})),
)