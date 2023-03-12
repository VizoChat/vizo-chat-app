import { createSelector } from "@ngrx/store";
import { appStateInterface } from "src/app/models/appState.interface";

export const selectFeature = (state:appStateInterface)=>state.authentication
export const isLoadingSelector = createSelector(
    selectFeature,
    (state)=>state.isLoading
)
export const errorSelector = createSelector(
    selectFeature,
    (state)=>state.error
)
export const successSelector = createSelector(
    selectFeature,
    (state)=>state.isLogged
)
