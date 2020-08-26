import {environment} from '../../environments/environment';

export const postUrl = '/delta/posts';
const genericUrl = environment.apiUrl;

const commonDeltaUrl = 'delta';
const commonAlphaUrl = 'alpha';

export const WEBSITE_DATA = `${genericUrl}/${commonDeltaUrl}/webdata`;
export const FILTER_POSTS = `${genericUrl}/${commonDeltaUrl}/filterPosts`;
export const POST_SLUG_URL = `${genericUrl}/${commonDeltaUrl}/post/url`;
export const POST_COMMENT = `${genericUrl}/${commonDeltaUrl}/$S/comments`;
