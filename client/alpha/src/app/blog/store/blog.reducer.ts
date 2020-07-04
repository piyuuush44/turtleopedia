import * as BlogActions from './blog.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {FilterPostModel} from '../models/filterPost.model';


export interface BlogState extends AppState {
  blogState: State;
}

export interface State {
  image_url: string;
  content_image_url: string;
  filterPostResult: FilterPostModel;
}

const initialState: State = {
  image_url: '',
  content_image_url: '',
  filterPostResult: new FilterPostModel([], {previous: null, next: null})
};

const blogReducer = createReducer(initialState,
  on(BlogActions.SAVE_BLOG_CONTENT_PICTURES, (state, action) => ({...state, content_image_url: action.payload})),
  on(BlogActions.SAVE_BLOG_PICTURES, (state, action) => ({...state, image_url: action.payload})),
  on(BlogActions.SAVE_BLOGS, (state, action) => ({...state, filterPostResult: action.payload})),
);


export function BlogReducer(state: State | undefined, action: Action) {
  return blogReducer(state, action);
}
