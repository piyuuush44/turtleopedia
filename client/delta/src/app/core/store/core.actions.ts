import {createAction, props} from '@ngrx/store';
import {WebdataModel} from '../model/webdata.model';
import {FilterPostModel} from '../model/filterPost.model';
import {Posts} from '../model/posts.model';

export const SAVE_WEBSITE_DATA = createAction(
    'SAVE_WEBSITE_DATA',
    props<{ payload: WebdataModel }>()
);
export const SAVE_FILTER_POSTS_DATA = createAction(
    'SAVE_FILTER_POSTS_DATA',
    props<{ payload: FilterPostModel }>()
);

export const TRY_FETCH_WEBSITE_DATA = createAction(
    'TRY_FETCH_WEBSITE_DATA',
);

export const TRY_FETCH_POST_BY_SLUG_URL = createAction(
    'TRY_FETCH_POST_BY_SLUG_URL',
    props<{ payload: string }>()
);

export const SAVE_POST = createAction(
    'SAVE_POST',
    props<{ payload: Posts }>()
);
export const TRY_FETCH_FILTER_POSTS = createAction(
    'TRY_FETCH_FILTER_POSTS',
    props<{ payload: string }>()
);

export const SET_PAGE_TITLE = createAction(
    'SET_PAGE_TITLE',
    props<{ payload: string }>()
);

export const SET_PAGE_META_TAGS = createAction(
    'SET_PAGE_META_TAGS',
    props<{ payload: Array<{ name: string, content: string }> }>()
);
