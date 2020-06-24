import {Component, OnInit} from '@angular/core';
import * as BlogActions from '../store/blog.actions';
import {blogStateBlogsSelector} from '../store/blog.selector';
import {select, Store} from '@ngrx/store';
import {Blog} from '../blog.model';
import {BlogState} from '../store/blog.reducer';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit {
  showPost = false;
  blogs: Blog[];
  selectedBlog: Blog;

  constructor(private store: Store<BlogState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(BlogActions.TRY_FETCH_BLOGS());

    this.store.pipe(select(blogStateBlogsSelector)).subscribe(
      value => {
        console.log(value);
        this.blogs = value;
      }
    );
  }

  togglePostView(index: number) {
    this.selectedBlog = this.blogs[index];
    this.showPost = !this.showPost;
  }
}
