import {Component, OnInit} from '@angular/core';
import {Posts} from "../../../../../delta_old/src/app/core/model/posts.model";
import {AppState} from "../../../../../delta_old/src/app/store/app.reducer";
import * as CoreActions from "../../../../../delta_old/src/app/core/store/core.actions";
import {coreStateCurrentPostDataSelector} from "../../../../../delta_old/src/app/core/store/core.selector";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";

@Component({
    selector: 'app-singleview',
    templateUrl: './singleview.component.html',
    styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {
    slugUrl: string;
    post: Posts;

    constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.slugUrl = params.get('slug_url');
        });
        this.store.dispatch(CoreActions.TRY_FETCH_POST_BY_SLUG_URL({payload: this.slugUrl}));

        this.store.pipe(select(coreStateCurrentPostDataSelector)).subscribe(
            value => {
                console.log('hi', value)
                this.post = value;
            }
        );
    }

    ngOnDestroy() {
        this.slugUrl = null;
        this.post = null;
    }

}
