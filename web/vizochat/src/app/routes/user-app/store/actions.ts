import { createAction, props } from "@ngrx/store";
import { channels } from "../models/channels.interface";
import { user } from "../models/user.interface";

//page inital work, getting userdetails and store
export const getUser = createAction('[UserApp] get user data')
export const gotUser = createAction('[UserApp] completed user setup',props<{user:user}>())
export const errorGettingUser = createAction('[UserApp] error user setup',props<{error:string}>())

//settings/manage > channels > new
export const newChannel = createAction('[UserApp] initiated new channel rqst', props<{channelName:String|null|undefined,channelDomain:String|null|undefined}>()) 
export const createdChannel = createAction('[UserApp] created new channel', props<{successMessage:string}>()) 
export const errorChannel = createAction('[UserApp] error creating channel',props<{errorMessage:string}>()) 

//settings/manage > channels > edit
export const editChannel = createAction('[UserApp] initiated edit channel rqst', props<{channelName:String|null|undefined,channelDomain:String|null|undefined}>()) 
export const editedChannel = createAction('[UserApp] edited channel', props<{successMessage:string}>()) 
export const errorEditingChannel = createAction('[UserApp] error editing channel',props<{errorMessage:string}>()) 

//settings/manage > channels > get data
export const getChannels = createAction('[UserApp] get channel data')
export const gotChannels = createAction('[UserApp] got channel data', props<{channels:channels[]}>())
export const errorGettingChannels = createAction('[UserApp] error getting channel data',props<{errorMessage:string}>())

//settings/manage > channels > del
export const delChannels = createAction('[UserApp] del channel data', props<{channel_id:String|null|undefined}>())
export const deletedChannels = createAction('[UserApp] deleted channel data', props<{successMessage:string}>())
export const errorDeletingChannels = createAction('[UserApp] error Deleting channel data',props<{errorMessage:string}>())

//Common
export const clearSuccessMsg = createAction('[UserApp] Clear success message')
export const clearErrorMsg = createAction('[UserApp] Clear error message')
