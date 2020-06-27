import {CoreState} from './core.reducer';
import {createSelector} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

export const coreState = (state: AppState) => state.coreState;

export const coreStateWebsiteDataSelector = createSelector(
  coreState, (state: CoreState) => state.data
);

export const coreStateFilterPostDataSelector = createSelector(
  coreState, (state: CoreState) => state.fitlerPosts
);

export const coreStateCurrentPostDataSelector = createSelector(
  coreState, (state: CoreState) => state.currentPost
);
