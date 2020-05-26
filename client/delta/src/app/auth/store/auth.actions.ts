import {Action} from '@ngrx/store';
import {ProfileModel} from '../../core/model/profile.model';

export const FETCH_SIGNUP_FIELDS = 'FETCH_SIGNUP_FIELDS';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const TRY_AUTH_SIGNIN = 'TRY_AUTH_SIGNIN';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const TRY_PROFILE_EDIT = 'TRY_PROFILE_EDIT';
export const SET_PROFILE = 'SET_PROFILE';
export const SEND_OTP = 'SEND_OTP';
export const VERIFY_OTP = 'VERIFY_OTP';
export const SET_PASSWORD = 'SET_PASSWORD';
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES';


export class UploadImages implements Action {
  readonly type = UPLOAD_IMAGES;

  constructor(public payload: any) {
  }
}

export class SetPassword implements Action {
  readonly type = SET_PASSWORD;

  constructor(public payload: { mobile: string, password: string }) {
  }
}

export class VerifyOtp implements Action {
  readonly type = VERIFY_OTP;

  constructor(public payload: { mobile: string, otp: number }) {
  }
}

export class SendOtp implements Action {
  readonly type = SEND_OTP;

  constructor(public payload: { type: string, mobile: string }) {
  }

}

export class SetProfile implements Action {
  readonly type = SET_PROFILE;

  constructor(public payload: ProfileModel) {
  }
}

export class TryProfileEdit implements Action {
  readonly type = TRY_PROFILE_EDIT;

  constructor(public payload: {}) {
  }
}

export class FetchSignupFields implements Action {
  readonly type = FETCH_SIGNUP_FIELDS;

  constructor(public payload: { role: string }) {
  }
}

export class TrySignUp implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {}) {
  }
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { mobile: string, password: string }) {
  }
}

export class TryAuthSignIn implements Action {
  readonly type = TRY_AUTH_SIGNIN;
}

export class SignIn implements Action {
  readonly type = SIGNIN;
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: any) {
  }
}

export type AuthActions =
  UploadImages |
  SetPassword |
  VerifyOtp | SendOtp |
  SetProfile |
  TryProfileEdit |
  FetchSignupFields |
  TrySignUp |
  TrySignIn |
  SignIn |
  LogOut |
  TryAuthSignIn |
  SetToken;
