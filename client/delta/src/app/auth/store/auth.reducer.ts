import {AuthActions} from './auth.actions';
import {ProfileModel} from '../../core/model/profile.model';

export interface AuthState {
  token: string;
  authenticated: boolean;
  profile: ProfileModel;
}

const profile = JSON.parse(localStorage.getItem('user'));

const initialState: AuthState = {
  token: localStorage.getItem('Authorization') !== null ? localStorage.getItem('Authorization') : null,

  authenticated: localStorage.getItem('Authorization') !== null,

  profile: localStorage.getItem('Authorization') ? Object.assign(new ProfileModel(), profile) : new ProfileModel()
};

export function AuthReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case 'SET_PROFILE': {
      console.log('executing set profile');
      localStorage.setItem('user', JSON.stringify(action.payload));
      const profileObject: ProfileModel = action.payload;
      return {
        ...state,
        profile: profileObject
      };
    }
    case 'SIGNIN': {
      console.log('executing sign in action');
      return {
        ...state,
        authenticated: true
      };
    }
    case 'SET_TOKEN':
      console.log('executing set token action');
      localStorage.setItem('Authorization', action.payload);
      return {
        ...state,
        token: action.payload
      };
    case 'LOGOUT': {
      localStorage.removeItem('Authorization');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        authenticated: false
      };
    }

    default: {
      return state;
    }
  }
}
