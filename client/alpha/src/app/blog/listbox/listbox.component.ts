import {Component, OnInit} from '@angular/core';
import * as BlogActions from "../store/blog.actions";
import {blogStateblogsSelector} from "../store/blog.selector";
import {AppState} from "../../store/app.reducer";
import {select, Store} from "@ngrx/store";
import {Blog} from "../blog.model";

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit {
  showPost = false
  blogs: Blog[]

  constructor(private _store: Store<AppState>) {
  }

  ngOnInit(): void {
    this._store.dispatch(BlogActions.TRY_FETCH_BLOGS());

    this._store.pipe(select(blogStateblogsSelector)).subscribe(
      value => {
        this.blogs = value
      }
    )
  }

  togglePostView() {
    this.showPost = !this.showPost
  }
}
