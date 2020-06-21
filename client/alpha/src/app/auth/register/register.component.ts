import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import * as AuthActions from "../store/auth.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.registerForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const value = this.registerForm.getRawValue();
    this._store.dispatch(AuthActions.TRY_SIGNUP({payload: value}));
  }

}
