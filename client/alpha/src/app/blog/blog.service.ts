import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as ServerEndpoints from '../shared/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blog: any;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient
  ) {
  }


  getBlog() {
    return this._httpClient.get(ServerEndpoints.GET_POST);
  }

  /**
   * Save blog
   *
   * @param blog
   * @returns {Promise<any>}
   */
  saveBlog(blog) {
    return this._httpClient.post(ServerEndpoints.SAVE_POST, blog);
  }


  uploadPicture(data) {
    return this._httpClient.post(ServerEndpoints.IMAGE_UPLOAD_URL, data, {observe: 'response'})
  }
}
