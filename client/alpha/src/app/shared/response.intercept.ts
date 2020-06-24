import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../auth/store/auth.reducer';
import {Router} from "@angular/router";

@Injectable()
export class ResponseIntercept implements HttpInterceptor {
  constructor(private store: Store<AuthState>, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(
      event => {
        console.log(event);
      }, e => {
        if (e instanceof HttpErrorResponse && e.status === 401) {
          alert('Unauthorized Request !! You will be logged out now.');
          setTimeout(() => {
            this.store.dispatch(AuthActions.LOGOUT());
            this.router.navigate(['/login'])
          }, 2000);
        }
      }
    ));
  }
}
