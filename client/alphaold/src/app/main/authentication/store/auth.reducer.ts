import * as AuthActions from './auth.actions';
import {Action, createReducer, on} from "@ngrx/store";
import {ProfileModel} from "../profile.model";
import {State} from "../../../store/reducers";

export interface AuthReducerState extends State {
    auth: AuthState,
}

export interface AuthState {
    profile: ProfileModel,
    authenticated: Boolean,
}

const initialState: AuthState = {
    profile: [],
    authenticated: false
};

const reducer = createReducer(initialState,
    on(AuthActions.LOGIN, (state, action) => ({...state, profile: action.payload, authenticated: true})),
)


export function AuthReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
