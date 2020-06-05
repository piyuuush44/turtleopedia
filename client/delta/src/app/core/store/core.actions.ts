import {Action, createAction, props} from "@ngrx/store";
import {WebdataModel} from "../model/webdata.model";

// export const TRY_FETCH_WEBSITE_DATA = 'TRY_FETCH_WEBSITE_DATA';
// export const SAVE_WEBSITE_DATA = 'SAVE_WEBSITE_DATA';


export const SAVE_WEBSITE_DATA = createAction(
  'SAVE_WEBSITE_DATA',
  props<WebdataModel>()
);

export const TRY_FETCH_WEBSITE_DATA = createAction(
  'TRY_FETCH_WEBSITE_DATA',
)

//
// export class FetchWebsiteData implements Action {
//   readonly type = TRY_FETCH_WEBSITE_DATA;
//
//   constructor() {
//   }
// }
//
// export class SaveWebsiteData implements Action {
//   readonly type = SAVE_WEBSITE_DATA;
//
//   constructor(public payload: WebdataModel) {
//   }
// }
//
// export type CoreActions =
//   SaveWebsiteData |
//   FetchWebsiteData;
