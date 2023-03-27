import { createSelector } from "@ngrx/store";
import { appStateInterface } from "src/app/models/appState.interface";

export const selectorFeature = (state:appStateInterface)=>state.widget;
export const isLoadingSelector = createSelector(
    selectorFeature,
    (state)=>state.isLoading
)
export const isPageLoadingSelector = createSelector(
    selectorFeature,
    (state)=>state.isPageLoading
)
export const errorSelector = createSelector(
    selectorFeature,
    (state)=>state.error 
)
export const successSelector = createSelector(
    selectorFeature,
    (state)=>state.success 
)
export const roomsSelector = createSelector(
    selectorFeature,
    (state)=>state.rooms 
)