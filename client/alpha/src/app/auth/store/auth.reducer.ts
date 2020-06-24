import * as AuthActions from './auth.actions';
import {Action, createReducer, on} from "@ngrx/store";
import {ProfileModel} from "../profile.model";

const profile: ProfileModel = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null;

export interface AuthState {
  profile: ProfileModel,
  token: string,
  authenticated: boolean,
}

const initialState: AuthState = {
  profile: profile ? new ProfileModel(profile._id, profile.email, profile.stage) : new ProfileModel(),
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  authenticated: localStorage.getItem('token') !== null
};

const reducer = createReducer(initialState,
  on(AuthActions.LOGIN, (state, action) => {
    localStorage.setItem('profile', JSON.stringify(action.payload))
    return {...state, profile: action.payload}
  }),
  on(AuthActions.TRY_SET_TOKEN, (state, action) => {
    localStorage.setItem('token', action.payload)
    return {...state, authenticated: true, token: action.payload}
  }),
)


export function AuthReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
