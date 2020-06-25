import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {authStateIsAuthenticatedSelector, authStateProfileSelector} from './store/auth.selector';
import {Injectable} from '@angular/core';
import {ProfileModel} from './profile.model';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  isAuthorized: boolean;
  profile: ProfileModel;

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.pipe(select(authStateIsAuthenticatedSelector)).subscribe(
      value => {
        this.isAuthorized = value;
      }
    );

    this.store.pipe(select(authStateProfileSelector)).subscribe(
      profile => {
        this.profile = profile;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isAuthorized) {
      this.router.navigate(['/login']);
      return false;
    }
    if (this.profile.stage !== 'approved') {
      alert('Please ask your administrator to approve your account!');
      this.router.navigate(['/login']);
      return false;
    }
    return this.isAuthorized;
  }
}
