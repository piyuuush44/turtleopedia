import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {authStateIsAuthenticatedSelector} from "./store/auth.selector";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAuthorized: boolean;

  constructor(private router: Router, private _store: Store<AppState>) {
    this._store.pipe(select(authStateIsAuthenticatedSelector)).subscribe(
      value => {
        this.isAuthorized = value
      }
    )
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isAuthorized) {
      this.router.navigate(['/login'])
    }
    return this.isAuthorized;
  }
}
