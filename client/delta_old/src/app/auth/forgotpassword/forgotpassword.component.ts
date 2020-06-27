import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import * as AuthActions from '../store/auth.actions';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit, OnDestroy {

  mobileCheck: Subscription;
  mobileCheckToken = false;
  otpCheck: Subscription;
  otpCheckToken = false;


  isMobileVerified = false;
  isOtpVerified = false;
  mobile: string;

  constructor(private store: Store<AppState>, private authService: AuthService) {
  }

  ngOnInit() {
    this.mobileCheck = this.authService.loginMobileCheckToken.subscribe(
      (value) => {
        if (value === true) {
          this.isMobileVerified = true;
        } else {
          this.mobileCheckToken = true;
        }
      }
    );

    this.otpCheck = this.authService.loginOtpCheckToken.subscribe(
      (value) => {
        if (value === true) {
          this.isOtpVerified = true;
        } else {
          this.otpCheckToken = true;
        }
      }
    );
  }

  verifymobile(form: NgForm) {
    this.mobile = form.value.mobile;
    this.store.dispatch(new AuthActions.SendOtp({type: 'otp', mobile: this.mobile}));
  }

  verifyotp(form: NgForm) {
    const otp = (+form.value.otp1) + '' + (+form.value.otp2) + '' + (+form.value.otp3) + '' + (+form.value.otp4);
    this.store.dispatch(new AuthActions.VerifyOtp({mobile: this.mobile, otp: +otp}));
  }

  changepassword(form: NgForm) {
    this.store.dispatch(new AuthActions.SetPassword({mobile: this.mobile, password: form.value.password}));
  }

  keytab(event) {
    const element = event.srcElement.nextElementSibling; // get the sibling element
    if (element == null) {
      return;
    } else {
      element.focus();
    }
  }

  ngOnDestroy(): void {
    this.otpCheck.unsubscribe();
    this.mobileCheck.unsubscribe();
  }
}
