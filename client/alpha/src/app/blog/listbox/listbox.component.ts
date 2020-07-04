import {Component, OnInit} from '@angular/core';
import * as BlogActions from '../store/blog.actions';
import {blogStateBlogsSelector} from '../store/blog.selector';
import {select, Store} from '@ngrx/store';
import {Blog} from '../models/blog.model';
import {BlogState} from '../store/blog.reducer';
import {FilterPostModel} from "../models/filterPost.model";
import * as endPoints from "../../shared/endpoints";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit {
  showPost = false;
  blogs: FilterPostModel;
  selectedBlog: Blog;
  pageNumber = 1;
  limit = 10;
  offset = 0;

  constructor(private store: Store<BlogState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const url = `${endPoints.GET_POST}?limit=${this.limit}&offset=${this.offset}`;
    this.store.dispatch(BlogActions.TRY_FETCH_BLOGS({payload: url}));

    this.store.pipe(select(blogStateBlogsSelector)).subscribe(
      value => {
        this.blogs = value;
      }
    );
  }

  togglePostView(index: number) {
    this.selectedBlog = this.blogs.results[index];
    this.showPost = !this.showPost;
  }

  paginateForward() {
    this.pageNumber += 1;
    this.store.dispatch(BlogActions.TRY_FETCH_BLOGS({payload: this.blogs._links.next}));
  }

  paginateBackward() {
    this.pageNumber -= 1;
    this.store.dispatch(BlogActions.TRY_FETCH_BLOGS({payload: this.blogs._links.previous}));
  }

  onEdit(index: number) {
    this.router.navigate([`../edit/${this.blogs.results[index]._id}`], {relativeTo: this.route})
  }

}
