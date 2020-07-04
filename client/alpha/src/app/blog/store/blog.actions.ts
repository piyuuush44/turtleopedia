import {createAction, props} from '@ngrx/store';
import {Blog} from '../models/blog.model';
import {FilterPostModel} from "../models/filterPost.model";

export const TRY_UPLOAD_BLOG_PICTURES = createAction(
  'TRY_UPLOAD_BLOG_PICTURES',
  props<{ payload: any }>()
);

export const TRY_UPLOAD_BLOG_CONTENT_PICTURES = createAction(
  'TRY_UPLOAD_BLOG_CONTENT_PICTURES',
  props<{ payload: any }>()
);

export const SAVE_BLOG_PICTURES = createAction(
  'SAVE_BLOG_PICTURES',
  props<{ payload: string }>()
);

export const SAVE_BLOG_CONTENT_PICTURES = createAction(
  'SAVE_BLOG_CONTENT_PICTURES',
  props<{ payload: string }>()
);

export const SAVE_BLOGS = createAction(
  'SAVE_BLOGS',
  props<{ payload: FilterPostModel }>()
);

export const TRY_FETCH_BLOGS = createAction(
  'TRY_FETCH_BLOGS',
  props<{ payload: string }>()
);

export const SAVE_BLOG = createAction(
  'SAVE_BLOG',
  props<{ payload: Blog }>()
);
