import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {CoreState} from './core.reducer';
import * as CoreAction from './core.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastService} from '../../shared/toast/toast.service';
import {BlogService} from '../blog.service';
import {EMPTY} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';

@Injectable()
export class CoreEffects {

    fetchWebsiteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoreAction.TRY_FETCH_WEBSITE_DATA),
            switchMap(() =>
                this.blogService.getWebsiteData().pipe(
                    map((response: HttpResponse<any>) => {
                            return CoreAction.SAVE_WEBSITE_DATA({payload: response.body.result.data});
                        }
                    ),
                    catchError(error => EMPTY
                    )
                )
            )
        )
    );

    fetchPostDataBySlugUrl$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoreAction.TRY_FETCH_POST_BY_SLUG_URL),
            map((data) => data.payload),
            switchMap((data) =>
                this.blogService.getPostBySlugUrl(data).pipe(
                    map((response: HttpResponse<any>) => {
                            return CoreAction.SAVE_POST({payload: response.body.result.post});
                        }
                    ),
                    catchError(error => EMPTY
                    )
                )
            )
        )
    );

    fetchFilteredPosts = createEffect(() =>
        this.actions$.pipe(
            ofType(CoreAction.TRY_FETCH_FILTER_POSTS),
            map((data) => data.payload),
            switchMap((url) =>
                this.blogService.getFilteredPosts(url).pipe(
                    map((response: HttpResponse<any>) => {
                        return CoreAction.SAVE_FILTER_POSTS_DATA({payload: response.body});
                    })
                )
            )
        )
    );

    setPageTitle = createEffect(
        () => this.actions$.pipe(
            ofType(CoreAction.SET_PAGE_TITLE),
            map((data) => data.payload),
            switchMap((pageTitle) => {
                this.title.setTitle(pageTitle);
                return EMPTY;
            })
        ), {dispatch: false}
    );

    setPageMetaTags = createEffect(
        () => this.actions$.pipe(
            ofType(CoreAction.SET_PAGE_META_TAGS),
            map((data) => data.payload),
            switchMap((metaTags) => {
                metaTags.forEach(tag => {
                    this.meta.updateTag({name: tag.name, content: tag.content});
                });
                return EMPTY;
            })
        ), {dispatch: false}
    );

    constructor(
        private meta: Meta,
        private title: Title,
        private actions$: Actions,
        private store: Store<CoreState>,
        private http: HttpClient,
        private router: Router,
        private toastService: ToastService,
        private blogService: BlogService
    ) {
    }
}
