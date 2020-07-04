import {BlogState, State} from './blog.reducer';
import {createSelector} from '@ngrx/store';

export const blogState = (state: BlogState) => state.blogState;

export const blogStateImageUrlSelector = createSelector(
  blogState, (state: State) => state.image_url
);

export const blogStateContentImageUrlSelector = createSelector(
  blogState, (state: State) => state.content_image_url
);

export const blogStateBlogsSelector = createSelector(
  blogState, (state: State) => state.filterPostResult
);
