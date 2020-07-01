import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterPostModel} from '../model/filterPost.model';
import {AppState} from '../../store/app.reducer';
import * as CoreActions from '../../core/store/core.actions';
import {coreStateFilterPostDataSelector} from '../store/core.selector';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as endPoints from '../../shared/serverEndpoints';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
    pageNumber = 1;
    pageLimit = 5;
    categoryId: string;
    posts: FilterPostModel = new FilterPostModel([], {next: null, previous: null});

    constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.categoryId = params.get('category_id');
            const limit = this.pageLimit * this.pageNumber;
            const offset = limit - this.pageLimit;
            const url = `${endPoints.FILTER_POSTS}?category=${
                this.categoryId.toLowerCase()
            }&limit=${limit}&offset=${offset}`;
            this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: url}));
        });

        this.store.pipe(select(coreStateFilterPostDataSelector)).subscribe(
            value => {
                this.posts = value;
                if (this.posts.results && this.posts.results.length === 0) {
                    alert('No post found!');
                    this.router.navigate(['/b/home']);
                }
            }
        );
    }

    ngOnDestroy() {
        this.categoryId = null;
        this.posts = null;
    }

    paginateForward() {
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: this.posts._links.next}));
    }

    paginateBackward() {
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: this.posts._links.previous}));
    }
}
