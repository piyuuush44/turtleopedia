import {Component, OnInit} from '@angular/core';
import {AppState} from './store/app.reducer';
import {Store} from '@ngrx/store';
import * as CoreActions from './core/store/core.actions';
import {NavigationEnd, Router} from '@angular/router';
import * as endPoints from './shared/serverEndpoints';
import * as env from '../environments/environment';
import {Meta} from '@angular/platform-browser';

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
        private router: Router
    ) {
    }

    title = 'delta';
    metaTags = [
        {name: 'keywords', content: 'Technology,Nodejs, Lifestyle, Fashion, Angular, Php, Promises, Javascript'},
        {
            name: 'og:url',
            content: 'https://www.turtleopedia.com'
        },
        {
            name: 'og:type',
            content: 'A complete blog related to technology, lifestyle, entertainment'
        },

        {
            name: 'og:title',
            content: 'Turtleopedia, The complete Blog'
        },

        {
            name: 'og:description',
            content: 'A blog where anyone can explain concepts and issues in a more personalized manner, which can help us prepare for our future and others too.'
        },
        {
            name: 'og:image',
            content: 'https://storage.googleapis.com/turtleopedia_assets_prod/images/logo.png'
        }
    ];

    ngOnInit() {
        this.store.dispatch(CoreActions.SET_PAGE_META_TAGS({payload: this.metaTags}));
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
