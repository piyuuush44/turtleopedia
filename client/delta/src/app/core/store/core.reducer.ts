import * as CoreActions from './core.actions';
import {WebdataModel} from "../model/webdata.model";
import {Action, createReducer, on} from "@ngrx/store";
import {FilterPostModel} from "../model/filterPost.model";

export interface CoreState {
  data: WebdataModel,
  fitlerPosts: FilterPostModel
}

const initialState: CoreState = {
  data: new WebdataModel([], [], [], []),
  fitlerPosts: new FilterPostModel([], {},)
};

const reducer = createReducer(initialState,
  on(CoreActions.SAVE_WEBSITE_DATA, (state, action) => ({...state, data: action})),
  on(CoreActions.SAVE_FILTER_POSTS_DATA, ((state, action) => ({...state, fitlerPosts: action}))),
)


export function CoreReducer(state: CoreState | undefined, action: Action) {
  return reducer(state, action);
}
