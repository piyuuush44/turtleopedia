import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterPostModel} from '../../model/filterPost.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import * as CoreActions from '../../store/core.actions';
import {coreStateFilterPostDataSelector} from '../../store/core.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

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
        }
      );
    }

    ngOnDestroy() {
      this.categoryId = null;
      this.posts = null;
    }
}
