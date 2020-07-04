import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {BlogState} from './blog.reducer';
import * as BlogActions from './blog.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {EMPTY} from 'rxjs';
import {BlogService} from '../blog.service';
import * as endPoints from "../../shared/endpoints";

@Injectable()
// @ts-ignore
export class BlogEffects {
  tryUploadPicture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.TRY_UPLOAD_BLOG_PICTURES),
      map((data) => data.payload),
      switchMap((data) =>
        this.blogService.uploadPicture(data).pipe(
          map((response: HttpResponse<any>) => {
              alert('Uploaded blog post picture successfully!');
              return BlogActions.SAVE_BLOG_PICTURES({payload: response.body.result.fileUrl[0]});
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
              alert('Uploaded blog content picture successfully!');
              return BlogActions.SAVE_BLOG_CONTENT_PICTURES({payload: response.body.result.fileUrl[0]});
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
      map((data) => data.payload),
      switchMap((url) =>
        this.blogService.getBlog(url).pipe(
          map((response: any) => {
              return BlogActions.SAVE_BLOGS({payload: response.body});
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
              console.log(response.body);
              this.router.navigate(['/blog/list']);
              const limit = 10;
              const offset = 0;
              const url = `${endPoints.GET_POST}?limit=${limit}&offset=${offset}`;
              return BlogActions.TRY_FETCH_BLOGS({payload: url});
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
