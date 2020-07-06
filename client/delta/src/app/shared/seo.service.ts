import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {pageTitleSelector} from '../core/store/core.selector';
import {filter, map, mergeMap} from 'rxjs/operators';
import {AppState} from '../store/app.reducer';
import validate = WebAssembly.validate;

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    pageTitle: string;

    constructor(private title: Title, private meta: Meta, private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {

        this.store.pipe(select(pageTitleSelector)).subscribe(
            value => {
                this.router.events.pipe(
                    filter((event) => event instanceof NavigationEnd),
                    map(() => this.route),
                    map((myRoute) => {
                        while (myRoute.firstChild) { myRoute = myRoute.firstChild; }
                        return myRoute;
                    }),
                    filter((route) => route.outlet === 'primary'),
                    mergeMap((route) => route.data)
                )
                    .subscribe(() => {
                        this.updateTitle(value);
                        this.updateOgUrl('event[\'ogUrl\']');
                        // Updating Description tag dynamically with title
                        this.updateDescription('value.feature_content');
                    });

            }
        );
    }

    updateTitle(customTitle) {
        this.title.setTitle(customTitle);
    }

    updateOgUrl(url: string) {
        this.meta.updateTag({name: 'og:url', content: url});
    }

    updateDescription(desc: string) {
        this.meta.updateTag({name: 'description', content: desc});
    }

}
