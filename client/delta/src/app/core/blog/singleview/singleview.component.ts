import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as CoreActions from "../../store/core.actions";
import {coreStateCurrentPostDataSelector} from "../../store/core.selector";
import {Posts} from "../../model/posts.model";

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {

  slug_url: String
  post: Posts

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug_url = params.get('slug_url')
    });
    this.store.dispatch(CoreActions.TRY_FETCH_POST_BY_SLUG_URL({payload: this.slug_url}));

    this.store.pipe(select(coreStateCurrentPostDataSelector)).subscribe(
      value => {
        this.post = value
      }
    )
  }

  ngOnDestroy() {
    this.slug_url = null
    this.post = null
  }

}
