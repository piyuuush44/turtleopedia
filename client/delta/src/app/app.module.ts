import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './shared/auth.interceptor';
import {ResponseIntercept} from './shared/response.intercept';
// import {LoaderInterceptorService} from "./shared/loader.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {reducers} from './store/app.reducer';
import {AuthEffects} from './auth/store/auth.effects';
import {CoreEffects} from './core/store/core.effects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([AuthEffects, CoreEffects]),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ResponseIntercept, multi: true},
        // {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
