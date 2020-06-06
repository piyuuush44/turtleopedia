import {createAction, props} from "@ngrx/store";
import {WebdataModel} from "../model/webdata.model";
import {FilterPostModel} from "../model/filterPost.model";

export const SAVE_WEBSITE_DATA = createAction(
  'SAVE_WEBSITE_DATA',
  props<WebdataModel>()
);
export const SAVE_FILTER_POSTS_DATA = createAction(
  'SAVE_FILTER_POSTS_DATA',
  props<FilterPostModel>()
);

export const TRY_FETCH_WEBSITE_DATA = createAction(
  'TRY_FETCH_WEBSITE_DATA',
)

export const TRY_FETCH_FILTER_POSTS = createAction(
  'TRY_FETCH_FILTER_POSTS',
  props<{ url: String }>()
)
