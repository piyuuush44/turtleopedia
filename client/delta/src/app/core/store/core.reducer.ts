import * as CoreActions from './core.actions';
import {WebdataModel} from "../model/webdata.model";
import {Action, createReducer, on} from "@ngrx/store";
import {FilterPostModel} from "../model/filterPost.model";
import {Posts} from "../model/posts.model";

export interface CoreState {
  data: WebdataModel,
  currentPost: Posts,
  fitlerPosts: FilterPostModel
}

const initialState: CoreState = {
  data: new WebdataModel([], [], [], []),
  fitlerPosts: new FilterPostModel([], {},),
  currentPost: new Posts('', '', '', '', '', [], false, [], [], '', '')
};

const reducer = createReducer(initialState,
  on(CoreActions.SAVE_WEBSITE_DATA, (state, action) => ({...state, data: action.payload})),
  on(CoreActions.SAVE_FILTER_POSTS_DATA, ((state, action) => ({...state, fitlerPosts: action.payload}))),
  on(CoreActions.SAVE_POST, ((state, action) => ({...state, currentPost: action.payload}))),
)


export function CoreReducer(state: CoreState | undefined, action: Action) {
  return reducer(state, action);
}
