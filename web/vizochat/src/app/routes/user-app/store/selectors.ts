import { createSelector } from "@ngrx/store";
import { appStateInterface } from "src/app/models/appState.interface";

export const selectorFeature = (state:appStateInterface)=>state.userApp
export const isLoadingSelector = createSelector(
    selectorFeature,
    (state)=>state.isLoading
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