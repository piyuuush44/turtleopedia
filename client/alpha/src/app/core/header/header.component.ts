import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {authStateProfileSelector} from '../../auth/store/auth.selector';
import {ProfileModel} from '../../auth/profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  profile: ProfileModel;

  ngOnInit(): void {
    this.store.pipe(select(authStateProfileSelector)).subscribe(
      value => {
        this.profile = value;
      }
    );
  }

}
