import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginFormControls.email.value.indexOf('@') === -1) {
      alert('Please enter valid email');
      return;
    }
    const value = this.loginForm.getRawValue();
    this.store.dispatch(AuthActions.TRY_LOGIN({payload: value}));
  }
}
