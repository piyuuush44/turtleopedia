import {Component, OnInit} from '@angular/core';
import {FilterPostModel} from "../../../../../delta_old/src/app/core/model/filterPost.model";
import {AppState} from "../../../../../delta_old/src/app/store/app.reducer";
import * as CoreActions from "../../../../../delta_old/src/app/core/store/core.actions";
import {coreStateFilterPostDataSelector} from "../../../../../delta_old/src/app/core/store/core.selector";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    categoryId: string;
    posts: FilterPostModel = new FilterPostModel([], []);

    constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.categoryId = params.get('category_id');
        });
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: '?category=' + this.categoryId.toLowerCase() + '&limit=6&offset=0'}));

        this.store.pipe(select(coreStateFilterPostDataSelector)).subscribe(
            value => {
                this.posts = value;
                if (this.posts.results && this.posts.results.length === 0) {
                    alert('No post found!')
                    top.location.href = '/'
                }
            }
        );
    }

    ngOnDestroy() {
        this.categoryId = null;
        this.posts = null;
    }

}
