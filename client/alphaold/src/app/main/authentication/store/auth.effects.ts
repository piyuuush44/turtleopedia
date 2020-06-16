import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {EMPTY} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable()
export class AuthEffects {

    tryLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.TRY_LOGIN),
            map((data) => data.payload),
            switchMap((data) =>
                this.authService.trySignIn(data).pipe(
                    map((response: HttpResponse<any>) => {
                            return AuthActions.LOGIN(response.body.result.data)
                        }
                    ),
                    catchError(error => EMPTY
                    )
                )
            )
        )
    );

    trySignup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.TRY_SIGNUP),
            map((data) => data.payload),
            switchMap((data) =>
                this.authService.trySignUp(data).pipe(
                    map((response: HttpResponse<any>) => {
                            return AuthActions.LOGIN(response.body.result.data)
                        }
                    ),
                    catchError(error => EMPTY
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store<AuthState>,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {
    }
}
