import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as ServerEndpoints from '../shared/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blog: any;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getBlog(url: string) {
    return this.httpClient.get(url, {observe: 'response'});
  }

  getBlogById(id: string) {
    const url = `${ServerEndpoints.GET_POST_BY_ID}/${id}`;
    return this.httpClient.get(url, {observe: 'response'});
  }

  updateBlogById(id: string, data: any) {
    const url = `${ServerEndpoints.UPDATE_POST_BY_ID}/${id}`;
    return this.httpClient.put(url, data, {observe: 'response'});
  }

  saveBlog(blog) {
    return this.httpClient.post(ServerEndpoints.SAVE_POST, blog, {observe: 'response'});
  }


  uploadPicture(data) {
    return this.httpClient.post(ServerEndpoints.IMAGE_UPLOAD_URL, data, {observe: 'response'});
  }
}
