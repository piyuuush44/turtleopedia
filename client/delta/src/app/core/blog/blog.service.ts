import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) {
  }

  getWebsiteData(): Observable<any> {
    const websiteDataEndpoint = "http://delta/webdata";

    // We do not subscribe here! We let the resolver take care of that...
    return this.http.get(websiteDataEndpoint, {observe: 'response'});
  }
}
