import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {CoreState} from './core.reducer';
import * as CoreAction from './core.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastService} from '../../shared/toast/toast.service';
import {BlogService} from "../blog/blog.service";
import {EMPTY} from "rxjs";

@Injectable()
export class CoreEffects {

  fetchWebsiteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreAction.TRY_FETCH_WEBSITE_DATA),
      switchMap(() =>
        this.blogService.getWebsiteData().pipe(
          map((response: HttpResponse<any>) => {
              console.log(response.body)
              return CoreAction.SAVE_WEBSITE_DATA(response.body.result.data)
            }
          ),
          catchError(error =>
            EMPTY
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<CoreState>,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private blogService: BlogService
  ) {
  }
}
