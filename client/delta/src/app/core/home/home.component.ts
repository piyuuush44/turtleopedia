import {Component, OnInit} from '@angular/core';
import {FilterPostModel} from "../model/filterPost.model";
import {AppState} from "../../store/app.reducer";
import * as CoreActions from "../store/core.actions";
import {coreStateFilterPostDataSelector} from "../store/core.selector";
import {select, Store} from "@ngrx/store";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    posts: FilterPostModel = new FilterPostModel([], []);

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: ''}));

        this.store.pipe(select(coreStateFilterPostDataSelector)).subscribe(
            value => {
                console.log(value)
                this.posts = value;
            }
        );
    }
}
