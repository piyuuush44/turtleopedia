import {Component, OnDestroy, OnInit} from '@angular/core';
import {Posts} from '../model/posts.model';
import {AppState} from '../../store/app.reducer';
import * as CoreActions from '../store/core.actions';
import {coreStateCurrentPostDataSelector} from '../store/core.selector';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {templateJitUrl} from '@angular/compiler';

@Component({
    selector: 'app-singleview',
    templateUrl: './singleview.component.html',
    styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit, OnDestroy {
    slugUrl: string;
    post: Posts;
    tagString = 'Technology,Nodejs, Lifestyle, Fashion, Angular, Php, Promises, Javascript';

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private router: Router,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            this.slugUrl = params.get('slug_url');
        });
        this.store.dispatch(CoreActions.TRY_FETCH_POST_BY_SLUG_URL({payload: this.slugUrl}));

        this.store.pipe(select(coreStateCurrentPostDataSelector)).subscribe(
            value => {
                this.post = value;
                this.store.dispatch(CoreActions.SET_PAGE_TITLE({payload: value.title}));

                if (value.tags) {
                    this.tagString = '';
                    // stringfying all tags
                    value.tags.forEach((tag, index) => {
                        // for last index
                        if (index === value.tags.length - 1) {
                            this.tagString += `${tag}`;
                        } else {
                            // for other indexes
                            this.tagString += `${tag},`;
                        }
                    });
                }

                const metaTags = [
                    {
                        name: 'keywords',
                        content: this.tagString
                    },
                    {
                        name: 'og:url',
                        content: `https://www.turtleopedia.com/b/singleBlog/${value.slug_url}`
                    },
                    {
                        name: 'og:type',
                        content: value.title
                    },

                    {
                        name: 'og:title',
                        content: value.title
                    },
                    {
                        name: 'og:description',
                        content: this.removeTags(value.feature_content)
                    },
                    {
                        name: 'description',
                        content: this.removeTags(value.feature_content)
                    },
                    {
                        name: 'og:image',
                        content: value.image_url
                    }
                ];
                this.store.dispatch(CoreActions.SET_PAGE_META_TAGS({payload: metaTags}));
            }
        );
    }

    ngOnDestroy() {
        this.slugUrl = null;
        this.post = null;
    }

    removeTags(str) {
        if ((str === null) || (str === '')) {
            return false;
        } else {
            str = str.toString();
        }
        return str.replace(/(<([^>]+)>)/ig, '');
    }

}
