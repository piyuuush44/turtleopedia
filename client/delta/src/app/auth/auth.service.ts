import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  forgotPassMobileCheck = false;

  signupMobileCheckToken = new Subject<boolean>();
  loginMobilePageToken = new Subject<boolean>();
  loginMobileCheckToken = new Subject<boolean>();
  loginOtpCheckToken = new Subject<boolean>();
}
