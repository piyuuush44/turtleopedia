import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterPostModel} from '../model/filterPost.model';
import {AppState} from '../../store/app.reducer';
import * as CoreActions from '../../core/store/core.actions';
import {coreStateFilterPostDataSelector} from '../store/core.selector';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

    categoryId: string;
    posts: FilterPostModel = new FilterPostModel([], {next: null, previous: null});

    constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.categoryId = params.get('category_id');
        });
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS(
            {payload: '?category=' + this.categoryId.toLowerCase() + '&limit=6&offset=0'}
        ));

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

}
