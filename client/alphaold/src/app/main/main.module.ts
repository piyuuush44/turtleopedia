import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {StoreModule} from "@ngrx/store";
// import {mainReducer} from "./main.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "../../../../alpha/src/app/auth/store/auth.effects";
import {AuthReducer} from "../../../../alpha/src/app/auth/store/auth.reducer";

const routes: Routes = [
    {
        path: 'dashboards/analytics',
        loadChildren: () => import('./dashboards/analytics/analytics.module').then(module => module.AnalyticsDashboardModule)
    },
    {
        path: 'dashboards/project',
        loadChildren: () => import('./dashboards/project/project.module').then(module => module.ProjectDashboardModule)
    },
    {
        path: 'blog',
        loadChildren: () => import('./blogapp/blog.module').then(module => module.BlogModule)
    },
    {
        path: 'auth/forgot-password',
        loadChildren: () => import('./authentication/forgot-password/forgot-password.module').then(module => module.ForgotPasswordModule)
    },
    {
        path: 'auth/lock',
        loadChildren: () => import('./authentication/lock/lock.module').then(module => module.LockModule)
    },
    {
        path: 'auth/login',
        loadChildren: () => import('./authentication/login/login.module').then(module => module.LoginModule)
    },
    {
        path: 'auth/mail-confirm',
        loadChildren: () => import('./authentication/mail-confirm/mail-confirm.module').then(module => module.MailConfirmModule)
    },
    {
        path: 'auth/register',
        loadChildren: () => import('./authentication/register/register.module').then(module => module.RegisterModule)
    },
    {
        path: 'auth/reset-password',
        loadChildren: () => import('./authentication/reset-password/reset-password.module').then(module => module.ResetPasswordModule)
    },
];

@NgModule({
    imports: [
        StoreModule.forFeature('mainReducer', AuthReducer),
        EffectsModule.forFeature([AuthEffects]),
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class MainModule {
}
