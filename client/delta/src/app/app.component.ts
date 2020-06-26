import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as CoreActions from "./core/store/core.actions";
import {AppState} from "./store/app.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(CoreActions.TRY_FETCH_WEBSITE_DATA());
    this.store.dispatch(CoreActions.TRY_FETCH_FILTER_POSTS({payload: ''}));
  }

  title = 'delta';
}
