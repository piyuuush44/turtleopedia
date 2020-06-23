import * as FromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  authState: FromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: FromAuth.AuthReducer,
};
