import {createAction, props} from '@ngrx/store';
import {ProfileModel} from '../profile.model';

export const TRY_LOGIN = createAction(
  'TRY_LOGIN',
  props<{ payload: { email: string, password: string } }>()
);

export const LOGIN = createAction(
  'LOGIN',
  props<{ payload: ProfileModel }>()
);

export const LOGOUT = createAction(
  'LOGOUT',
);

export const TRY_SET_TOKEN = createAction(
  'TRY_SET_TOKEN',
  props<{ payload: string }>()
);

export const TRY_SIGNUP = createAction(
  'TRY_SIGNUP',
  props<{ payload: ProfileModel }>()
);
