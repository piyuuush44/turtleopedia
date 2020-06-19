import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as ServerEndpoints from '../shared/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  routeParams: any;
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
    return this._httpClient.get('api/e-commerce-blogs/' + this.routeParams.id);
  }

  /**
   * Save blog
   *
   * @param blog
   * @returns {Promise<any>}
   */
  saveBlog(blog) {
    return this._httpClient.post('api/e-commerce-blogs/' + blog.id, blog);
  }

  /**
   * Add blog
   *
   * @param blog
   * @returns {Promise<any>}
   */
  addBlog(blog) {
    return this._httpClient.post('api/e-commerce-blogs/', blog);
  }

  uploadPicture(data) {
    return this._httpClient.post(ServerEndpoints.IMAGE_UPLOAD_URL, data, {observe: 'response'})
  }
}
