import {CoreState} from "./core.reducer";
import {createSelector} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";

export const coreState = (state: AppState) => state.coreState

export const coreStateSelecter = createSelector(
  coreState, (state: CoreState) => state.data
)
