import {environment} from '../../environments/environment';
// this is the generic url
const genericUrl = environment.apiUrl;

const commonAppUrl = 'delta'
export const IMAGE_UPLOAD_URL = `${genericUrl}/${commonAppUrl}/postUploadFiles`
