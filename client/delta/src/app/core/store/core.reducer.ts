import * as CoreActions from './core.actions';
import {WebdataModel} from "../model/webdata.model";
import {Action, createReducer, on} from "@ngrx/store";

export interface CoreState {
  data: WebdataModel
}

const initialState: CoreState = {
  data: new WebdataModel([], [], [], [])
};

const reducer = createReducer(initialState,
  on(CoreActions.SAVE_WEBSITE_DATA, (state, action) => ({...state, data: action}))
)


export function CoreReducer(state: CoreState | undefined, action: Action) {
  return reducer(state, action);
}
