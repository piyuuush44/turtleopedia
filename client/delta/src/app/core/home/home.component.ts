import {Component, OnInit} from '@angular/core';
import {FilterPostModel} from '../model/filterPost.model';
import {AppState} from '../../store/app.reducer';
import * as CoreActions from '../store/core.actions';
import {coreStateFilterPostDataSelector} from '../store/core.selector';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    pageNumber = 1;
    pageLimit = 5;
    posts: FilterPostModel = new FilterPostModel([], {next: null, previous: null});

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.pageNumber = +params.get('page_number');
            const limit = this.pageLimit * this.pageNumber;
            const offset = limit - this.pageLimit;
            const url = `?limit=${limit}&offset=${offset}`;
            this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: url}));
        });

        this.store.pipe(select(coreStateFilterPostDataSelector)).subscribe(
            value => {
                this.posts = value;
            }
        );
    }
}
