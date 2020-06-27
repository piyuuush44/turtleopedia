import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {AuthService} from './auth.service';
import {RouterModule} from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule(
    {
        declarations: [
            LoginComponent,
            SignupComponent,
            ForgotpasswordComponent,
        ],
        imports: [
            RouterModule,
            CommonModule,
            FormsModule
        ],
        providers: [
            AuthService
        ]
    }
)
export class AuthModule {

}
