import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {authStateTokenSelector} from "../auth/store/auth.selector";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string

  constructor(private store: Store<AppState>) {
    this.store.pipe(
      select(authStateTokenSelector),
    ).subscribe(value => this.token = value)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({headers: req.headers.append('Authorization', 'Bearer ' + this.token)});
    return next.handle(cloneReq);
  }
}
