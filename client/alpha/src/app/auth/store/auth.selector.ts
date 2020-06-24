import {AuthState} from './auth.reducer';
import {createSelector} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

export const coreState = (state: AppState) => state.authState;

export const authStateIsAuthenticatedSelector = createSelector(
  coreState, (state: AuthState) => state.authenticated
);

export const authStateProfileSelector = createSelector(
  coreState, (state: AuthState) => state.profile
);

export const authStateTokenSelector = createSelector(
  coreState, (state: AuthState) => state.token
);
