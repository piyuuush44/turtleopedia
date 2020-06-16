import {AuthState} from "./auth.reducer";
import {createSelector} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";

export const coreState = (state: AppState) => state.authState

export const mainStateIsAuthenticatedSelector = createSelector(
  coreState, (state: AuthState) => state.authenticated
)

export const mainStateProfileSelector = createSelector(
  coreState, (state: AuthState) => state.profile
)
