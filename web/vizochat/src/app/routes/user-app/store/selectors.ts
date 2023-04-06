import { createSelector } from "@ngrx/store";
import { appStateInterface } from "src/app/models/appState.interface";

export const selectorFeature = (state:appStateInterface)=>state.userApp
export const isLoadingSelector = createSelector(
    selectorFeature,
    (state)=>state.isLoading
)
export const isContentLoadingSelector = createSelector(
    selectorFeature,
    (state)=>state.isContentLoading
)
export const isPageLoadingSelector = createSelector(
    selectorFeature,
    (state)=>state.isPageLoading
)
export const userDataSelector = createSelector(
    selectorFeature,
    (state)=>state.user
)
export const errorSelector = createSelector(
    selectorFeature,
    (state)=>state.error
)
export const successMssgSelector = createSelector(
    selectorFeature,
    (state)=>state.success
)
export const channelsSelector = createSelector(
    selectorFeature,
    (state)=>state.channels
)
export const chatRoomsSelector = createSelector(
    selectorFeature,
    (state)=>state.chatRooms
)
export const TeammatesSelector = createSelector(
    selectorFeature,
    (state)=>state.teammates
)
export const chatSelector = createSelector(
    selectorFeature,
    (state)=>state.chats
)