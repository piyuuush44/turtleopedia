import * as FromAuth from '../auth/store/auth.reducer';
import * as FromCore from '../core/store/core.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  authState: FromAuth.AuthState;
  coreState: FromCore.CoreState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: FromAuth.AuthReducer,
  coreState: FromCore.CoreReducer,
};
