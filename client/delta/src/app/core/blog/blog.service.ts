import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as endPoints from '../../shared/serverEndpoints';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) {
  }

  getWebsiteData(): Observable<any> {
    // We do not subscribe here! We let the resolver take care of that...
    return this.http.get(endPoints.WEBSITE_DATA, {observe: 'response'});
  }

  getFilteredPosts(): Observable<any> {
    // if (categories) {
    //   websiteDataEndpoint += '?category=' + categories
    // }
    // if (limit) {
    //   websiteDataEndpoint += 'limit=' + limit
    // }
    // if (offset) {
    //   websiteDataEndpoint += 'offset=' + offset
    // }

    // We do not subscribe here! We let the resolver take care of that...
    return this.http.get(endPoints.FILTER_POSTS, {observe: 'response'});
  }

  getPostBySlugUrl(slug_url): Observable<any> {
    const websiteDataEndpoint = `${endPoints.POST_SLUG_URL}/${slug_url}`;
    return this.http.get(websiteDataEndpoint, {observe: 'response'})
  }
}
