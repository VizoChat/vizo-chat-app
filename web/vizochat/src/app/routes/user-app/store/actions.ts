import { createAction, props } from "@ngrx/store";
import { user } from "../models/userApp.interface";

export const getUser = createAction('[UserApp] get user data')
export const gotUser = createAction('[UserApp] completed user setup',props<{user:user}>())
export const errorGettingUser = createAction('[UserApp] error user setup',props<{error:string}>())