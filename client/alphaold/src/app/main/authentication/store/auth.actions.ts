import {createAction, props} from "@ngrx/store";
import {ProfileModel} from "../profile.model";

export const TRY_LOGIN = createAction(
    'TRY_LOGIN',
    props<{ payload: { email: string, password: string } }>()
)

export const LOGIN = createAction(
    'LOGIN',
    props<{ payload: ProfileModel }>()
)

export const TRY_SIGNUP = createAction(
    'TRY_SIGNUP',
    props<{ payload: ProfileModel }>()
)
