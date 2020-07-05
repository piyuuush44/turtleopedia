import {environment} from '../../environments/environment';
// this is the generic url
const genericUrl = environment.apiUrl;

const commonDeltaUrl = 'delta';
const commonAlphaUrl = 'alpha';

export const IMAGE_UPLOAD_URL = `${genericUrl}/${commonDeltaUrl}/postUploadFiles`;
export const SAVE_POST = `${genericUrl}/${commonDeltaUrl}/posts`;
export const GET_POST = `${genericUrl}/${commonDeltaUrl}/posts`;
export const GET_POST_BY_ID = `${genericUrl}/${commonDeltaUrl}/post`;
export const UPDATE_POST_BY_ID = `${genericUrl}/${commonDeltaUrl}/post`;

export const LOGIN = `${genericUrl}/${commonAlphaUrl}/login`;
export const REGISTER = `${genericUrl}/${commonAlphaUrl}/register`;
