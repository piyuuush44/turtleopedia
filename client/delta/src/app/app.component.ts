import {Component} from '@angular/core';
import {AppState} from "./store/app.reducer";
import * as CoreActions from "./core/store/core.actions";
import {Store} from "@ngrx/store";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private store: Store<AppState>) {

    }

    title = 'delta';

    ngOnInit() {
        this.store.dispatch(CoreActions.TRY_FETCH_WEBSITE_DATA());
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: ''}));
    }
}
