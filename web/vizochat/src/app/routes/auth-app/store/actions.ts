import { createAction, props } from "@ngrx/store";
import { gToken, LoginForm, SignUpForm } from "../models/authentication.interface";

export const doLogin = createAction('[AuthApp] do login',props<{ formData: LoginForm , isUser:Boolean}>())
export const doSignup = createAction('[AuthApp] do signup',props<{ formData: SignUpForm}>())
export const doGLogin = createAction('[AuthApp] do Google login',props<{ formData: gToken }>())
export const doGSignup = createAction('[AuthApp] do Google signup',props<{ formData: gToken }>())
export const doLoginSuccess = createAction('[AuthApp] do auth Success')
export const doLoginFailure = createAction('[AuthApp] do auth Failure',props<{ error: string}>())
export const doLoginFailureClear = createAction('[AuthApp] clear auth Failure error')
