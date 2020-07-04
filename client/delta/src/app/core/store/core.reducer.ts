import * as CoreActions from './core.actions';
import {WebdataModel} from '../model/webdata.model';
import {Action, createReducer, on} from '@ngrx/store';
import {FilterPostModel} from '../model/filterPost.model';
import {Posts} from '../model/posts.model';

export interface CoreState {
    pageTitle: string
    data: WebdataModel;
    currentPost: Posts;
    filterPosts: FilterPostModel;
}

const initialState: CoreState = {
    pageTitle: 'Turtleopedia',
    data: new WebdataModel([], [], [], []),
    filterPosts: new FilterPostModel([], {next: null, previous: null},),
    currentPost: new Posts('', '', '', '', 0, '', [], false, [], [], '', '')
};

const reducer = createReducer(initialState,
    on(CoreActions.SAVE_WEBSITE_DATA, (state, action) => ({...state, data: action.payload})),
    on(CoreActions.SAVE_FILTER_POSTS_DATA, ((state, action) => ({...state, filterPosts: action.payload}))),
    on(CoreActions.SAVE_POST, ((state, action) => ({...state, currentPost: action.payload}))),
    on(CoreActions.SET_PAGE_TITLE, ((state, action) => ({...state, pageTitle: action.payload}))),
);


export function CoreReducer(state: CoreState | undefined, action: Action) {
    return reducer(state, action);
}
