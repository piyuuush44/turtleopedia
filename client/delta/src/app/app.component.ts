import {Component, OnInit} from '@angular/core';
import {AppState} from './store/app.reducer';
import {Store} from '@ngrx/store';
import * as CoreActions from './core/store/core.actions';
import {NavigationEnd, Router} from '@angular/router';


// declare ga as a function to set and sent the events
declare let gtag: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private store: Store<AppState>, private router: Router) {
    }

    title = 'delta';

    ngOnInit() {
        this.store.dispatch(CoreActions.TRY_FETCH_WEBSITE_DATA());
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: ''}));
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'xx-xxxxx-xx',
                    {
                        page_path: event.urlAfterRedirects
                    }
                );
            }
        });
    }
}
