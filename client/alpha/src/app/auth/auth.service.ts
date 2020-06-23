import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as ServerEndpoints from '../shared/endpoints';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {
  }

  trySignIn(data) {
    return this.http.post(ServerEndpoints.LOGIN, data, {observe: 'response'})
  }

  trySignUp(data) {
    return this.http.post(ServerEndpoints.REGISTER, data, {observe: 'response'})
  }
}
