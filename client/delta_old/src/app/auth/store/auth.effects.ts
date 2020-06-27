import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import * as AuthAction from './auth.actions';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import * as endPoints from '../../shared/serverEndpoints';
import {AuthService} from '../auth.service';
import {ToastService} from '../../shared/toast/toast.service';

@Injectable()
export class AuthEffects {

  @Effect()
  uploadImages = this.action.pipe(
    ofType(AuthAction.UPLOAD_IMAGES),
    map((data: AuthAction.UploadImages) => {
      return data.payload;
    }), switchMap((data: { profileImage: File, dobProof: File, addressProof: File }) => {
      return this.http.post('', data, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.toastService.showSuccess('Images uploaded successfully!');
        return [
          {
            type: AuthAction.SET_PROFILE,
            payload: response.body
          }];
      } else {
        alert('Unable to upload your photos! Please try again after sometime');
        return [];
      }
    })
  );

  @Effect({dispatch: false})
  setPassword = this.action.pipe(
    ofType(AuthAction.SET_PASSWORD),
    map((data: AuthAction.SetPassword) => {
      return data.payload;
    }), switchMap((data: { mobile: string, password: string }) => {
      return this.http.post('', data, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.toastService.showSuccess('Your password is updated, Please login!');
        this.router.navigate(['/login']);
        return [];
      }
    })
  );

  @Effect({dispatch: false})
  verifyOtp = this.action.pipe(
    ofType(AuthAction.VERIFY_OTP),
    map((data: AuthAction.VerifyOtp) => {
      return data.payload;
    }),
    switchMap((data: { mobile: string, otp: number }) => {
      return this.http.post('', data, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.toastService.showSuccess('OTP verified successfully!');
        this.authService.loginOtpCheckToken.next(true);
        return [];
      } else {
        this.authService.loginOtpCheckToken.next(false);
        return [];
      }
    })
  );

  @Effect({dispatch: false})
  sendOtp = this.action.pipe(
    ofType(AuthAction.SEND_OTP),
    map((data: AuthAction.SendOtp) => {
      return data.payload;
    }),
    switchMap((data: { type: string, mobile: string }) => {
      return this.http.post('', data, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.toastService.showSuccess('OTP sent successfully!');
        this.authService.loginMobileCheckToken.next(true);
        return [];
      } else if (response.status === 203) {
        this.toastService.showSuccess('User already Found!');
        this.authService.loginMobileCheckToken.next(false);
        return [];
      } else {
        this.authService.loginMobileCheckToken.next(false);
        return [];
      }
    })
  );

  // for profile edit
  @Effect()
  profileEdit = this.action.pipe(
    ofType(AuthAction.TRY_PROFILE_EDIT),
    map((action: AuthAction.TryProfileEdit) => {
      return action.payload;
    }),
    switchMap((data: {}) => {
      return this.http.post('', data, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.toastService.showSuccess('Your Profile is updated Successfully!');
        return [
          {
            type: AuthAction.SET_PROFILE,
            payload: response.body
          }];
      }
    })
  );


  // for signing up
  @Effect()
  authSignUp = this.action.pipe(
    ofType(AuthAction.TRY_SIGNUP),
    map((action: AuthAction.TrySignUp) => {
      return action.payload;
    }),
    switchMap((data: { mobile: number, password: string }) => {
      return this.http.post('', data, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.toastService.showSuccess('Welcome to Unfoldingskies!');
        this.router.navigate(['/profile']);

        return [
          {
            type: AuthAction.SET_PROFILE,
            payload: response.body
          },
          {
            type: AuthAction.SIGNIN
          },
          {
            type: AuthAction.SET_TOKEN,
            payload: JSON.stringify(response.body.auth_key)
          }];
      } else if (response.status === 201) {
        this.authService.signupMobileCheckToken.next(true);
      }
    })
  );
  // for log out
  @Effect()
  authLogout = this.action.pipe(
    ofType(AuthAction.LOGOUT),
    map(() => {
      window.location.href = '/';
    })
  );

  // for signup using social media where authkey is used to signin
  @Effect()
  authSignIn = this.action.pipe(
    ofType(AuthAction.TRY_AUTH_SIGNIN),
    switchMap(() => {
      return this.http.post('', {}, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.router.navigate(['/profile']);
        return [
          {
            type: AuthAction.SET_PROFILE,
            payload: response.body
          },
          {type: AuthAction.SIGNIN},
          {
            type: AuthAction.SET_TOKEN,
            payload: JSON.stringify(response.body.auth_key)
          },
        ];
      }
    })
  );
// for signing in
  @Effect()
  signIn = this.action.pipe(
    ofType(AuthAction.TRY_SIGNIN),
    map((action: AuthAction.TrySignIn) => {
      return action.payload;
    }),
    switchMap((data: { mobile: string, password: string }) => {
      return this.http.post('', data, {observe: 'response'});
    }),
    switchMap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.router.navigate(['/home']);
        return [
          {
            type: AuthAction.SET_PROFILE,
            payload: response.body
          },
          {type: AuthAction.SIGNIN},
          {
            type: AuthAction.SET_TOKEN,
            payload: JSON.stringify(response.body.auth_key)
          },
        ];
      } else {
        this.authService.loginMobilePageToken.next(false);
        return [];
      }
    })
  );

  constructor(
    private action: Actions,
    private store: Store<AuthState>,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
  }
}
