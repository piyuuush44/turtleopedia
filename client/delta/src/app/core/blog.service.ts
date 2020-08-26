import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as endPoints from '../shared/serverEndpoints';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    constructor(private http: HttpClient) {
    }

    saveComment(data, postId): Observable<any> {
        const postCommentEndpoint = `${endPoints.POST_COMMENT}`.replace('$S', postId);

        // We do not subscribe here! We let the resolver take care of that...
        return this.http.post(postCommentEndpoint, data, {observe: 'response'});
    }

    getWebsiteData(): Observable<any> {
        // We do not subscribe here! We let the resolver take care of that...
        return this.http.get(endPoints.WEBSITE_DATA, {observe: 'response'});
    }

    getFilteredPosts(url): Observable<any> {
        // We do not subscribe here! We let the resolver take care of that...
        return this.http.get(url, {observe: 'response'});
    }

    getPostBySlugUrl(slugUrl): Observable<any> {
        const websiteDataEndpoint = `${endPoints.POST_SLUG_URL}/${slugUrl}`;
        return this.http.get(websiteDataEndpoint, {observe: 'response'});
    }
}
