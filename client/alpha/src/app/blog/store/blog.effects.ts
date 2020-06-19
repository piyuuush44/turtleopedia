import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {BlogState} from './blog.reducer';
import * as BlogActions from './blog.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {EMPTY} from "rxjs";
import {BlogService} from "../blog.service";

@Injectable()
export class BlogEffects {

  tryUploadPicture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.TRY_UPLOAD_BLOG_PICTURES),
      map((data) => data.payload),
      switchMap((data) =>
        this.blogService.uploadPicture(data).pipe(
          map((response: HttpResponse<any>) => {
              return BlogActions.SAVE_BLOG_PICTURES({payload: response.body.result.fileUrl[0]})
            }
          ),
          catchError(error => EMPTY
          )
        )
      )
    )
  );

  tryUploadBlogContentPicture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.TRY_UPLOAD_BLOG_CONTENT_PICTURES),
      map((data) => data.payload),
      switchMap((data) =>
        this.blogService.uploadPicture(data).pipe(
          map((response: HttpResponse<any>) => {
              return BlogActions.SAVE_BLOG_CONTENT_PICTURES({payload: response.body.result.fileUrl[0]})
            }
          ),
          catchError(error => EMPTY
          )
        )
      )
    )
  );

  tryFetchBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.TRY_FETCH_BLOGS),
      switchMap(() =>
        this.blogService.getBlog().pipe(
          map((response: HttpResponse<any>) => {
              return BlogActions.SAVE_BLOG_PICTURES(response.body.result.data)
            }
          ),
          catchError(error => EMPTY
          )
        )
      )
    )
  );

  trySaveBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.SAVE_BLOG),
      map((data) => data.payload),
      switchMap((data) =>
        this.blogService.saveBlog(data).pipe(
          map((response: HttpResponse<any>) => {
              return BlogActions.TRY_FETCH_BLOGS()
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
    private store: Store<BlogState>,
    private http: HttpClient,
    private router: Router,
    private blogService: BlogService
  ) {
  }
}
