import {Component, OnInit} from '@angular/core';
import {AppState} from './store/app.reducer';
import {Store} from '@ngrx/store';
import * as CoreActions from './core/store/core.actions';
import {NavigationEnd, Router} from '@angular/router';
import * as endPoints from './shared/serverEndpoints';
import * as env from "../environments/environment";
import {Meta} from "@angular/platform-browser";

// declare ga as a function to set and sent the events
declare let gtag: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private meta: Meta
    ) {
    }

    title = 'delta';
    metaTags = [
        {name: 'keywords', content: 'TypeScript, Angular'},
        {
            name: "og:url",
            content: "https://www.turtleopedia.com"
        },
        {
            name: "og:type",
            content: "A complete blog related to technology, lifestyle, entertainment"
        },

        {
            name: "og:title",
            content: "Turtleopedia, The complete Blog"
        },

        {
            name: "og:description",
            content: "How much does culture influence creative thinking?"
        },
        {
            name: "og:image",
            content: "http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
        }
    ]

    ngOnInit() {
        this.store.dispatch(CoreActions.SET_PAGE_META_TAGS({payload: this.metaTags}))
        this.store.dispatch(CoreActions.TRY_FETCH_WEBSITE_DATA());
        this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: endPoints.FILTER_POSTS}));
        this.router.events.subscribe(event => {
            if (env.environment.production) {
                if (event instanceof NavigationEnd) {
                    gtag('config', 'UA-171131634-1',
                        {
                            page_path: event.urlAfterRedirects
                        }
                    );
                }
            }
        });
    }
}
