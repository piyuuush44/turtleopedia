import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  post(url: string, body: any) {
    return this.http.post<HttpResponse<any>>(url, body, {observe: 'response', reportProgress: true});

  }
}
