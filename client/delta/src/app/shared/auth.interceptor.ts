import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {switchMap, take} from 'rxjs/operators';
import {AuthState} from '../auth/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('authState').pipe(
      take(1),
      switchMap(
        (authState: AuthState) => {
          const token = authState.token ? authState.token : '';
          const cloneReq = req.clone({headers: req.headers.append('Authorization', token)});
          return next.handle(cloneReq);
        }
      )
    );
  }
}
