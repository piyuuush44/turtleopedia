import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import * as endPoints from '../../shared/serverEndpoints';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mobileCheck: Subscription;
  mobileCheckToken = false;

  fbLoginUrl = endPoints.fbLogin;
  googleLoginUrl = endPoints.googleLogin;

  constructor(private store: Store<AppState>, private authService: AuthService) {
  }

  ngOnInit() {
    this.mobileCheck = this.authService.loginMobilePageToken.subscribe(
      value => {
        if (value === false) {
          this.mobileCheckToken = true;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new AuthActions.TrySignIn(form.value));
  }
}
