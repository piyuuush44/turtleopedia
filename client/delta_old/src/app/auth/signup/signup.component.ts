import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';
// import {AppState} from '../../store/app.reducer';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
// import {ProfileModel} from '../../core/model/profile.model';
import * as endPoints from '../../shared/serverEndpoints';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  fbLoginUrl = endPoints.fbLogin;
  googleLoginUrl = endPoints.googleLogin;

  mobileCheck: Subscription;
  mobileCheckToken = false;
  profileData = new ProfileModel();
  extraData = {
    dob: {
      year: null,
      month: null,
      day: null
    }
    ,
    address: {
      permanentAddress: {
        pFullAddress: '',
        pPostalCode: null
      },
      currentAddress: {
        cFullAddress: '',
        cPostalCode: null
      }
    },
    roles: {
      business: {
        realEstateBusiness: false,
        transportationBusiness: false,
        travelCuratorBusiness: false,
        serviceSupplierBusiness: false,
        financeBusiness: false,
        propertiesBusiness: false,
        travelAgentBusiness: false
      },
      activityExperts: {
        wellnessExperts: false,
        waterExperts: false,
        mountainAdventureExperts: false,
        autoAdventureExperts: false,
        airAdventureExperts: false,
        otherExperts: false
      },
      jobBoard: {
        hotelStaffJob: false,
        wellnessMeditationJob: false,
        sportsGuideJob: false,
        hobbyExpertJob: false
      }
    }
  };

  constructor(private store: Store<AppState>, private authService: AuthService) {
  }

  ngOnInit() {
    Object.assign(this.profileData, this.extraData);
    console.log(this.profileData);

    this.mobileCheck = this.authService.signupMobileCheckToken.subscribe(
      value => {
        if (value === true) {
          this.mobileCheckToken = true;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    Object.assign(this.profileData, form.value);
    this.store.dispatch(new AuthActions.TrySignUp(this.profileData));
  }

  ngOnDestroy(): void {
    this.mobileCheck.unsubscribe();
  }
}
