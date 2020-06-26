import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  private usersEndpoint = 'http://localhost:3000/delta/posts';

  getUsers(): Observable<any> {
    // We do not subscribe here! We let the resolver take care of that...
    return this.http.get(this.usersEndpoint);
  }
}
