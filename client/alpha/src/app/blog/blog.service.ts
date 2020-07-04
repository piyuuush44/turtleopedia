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

  getBlog(url:string) {
    return this.httpClient.get(url, {observe: 'response'});
  }

  saveBlog(blog) {
    return this.httpClient.post(ServerEndpoints.SAVE_POST, blog, {observe: 'response'});
  }


  uploadPicture(data) {
    return this.httpClient.post(ServerEndpoints.IMAGE_UPLOAD_URL, data, {observe: 'response'});
  }
}
