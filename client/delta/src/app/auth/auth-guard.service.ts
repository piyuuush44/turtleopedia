import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {AuthState} from './store/auth.reducer';
import {map} from 'rxjs/operators';


export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized();
  }

  private isAuthorized() {
    return this.store.select('authState').pipe(
      map((authState: AuthState) => {
        return authState.authenticated;
      })
    );
  }
}
