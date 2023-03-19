import { createAction, props } from "@ngrx/store";
import { user } from "../models/user.interface";

//page inital work, getting userdetails and store
export const getUser = createAction('[UserApp] get user data')
export const gotUser = createAction('[UserApp] completed user setup',props<{user:user}>())
export const errorGettingUser = createAction('[UserApp] error user setup',props<{error:string}>())

//settings/manage > channels
export const newChannel = createAction('[UserApp] initiated new channel rqst', props<{channelName:String|null|undefined,channelDomain:String|null|undefined}>()) 
export const createdChannel = createAction('[UserApp] created new channel', props<{successMessage:string}>()) 
export const errorChannel = createAction('[UserApp] error creating channel',props<{errorMessage:string}>()) 


//Common
export const clearSuccessMsg = createAction('[UserApp] Clear success message')
export const clearErrorMsg = createAction('[UserApp] Clear error message')
