import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient) {
    }

    trySignIn(data) {
        return this.http.post('', data, {observe: 'response'})
    }

    trySignUp(data) {
        return this.http.post('', data, {observe: 'response'})
    }
}
