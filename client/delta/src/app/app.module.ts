import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {ResponseIntercept} from "./shared/response.intercept";
import {LoaderInterceptorService} from "./shared/loader.interceptor";
import {BlogModule} from "./core/blog/blog.module";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BlogModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // LoaderService,
    // AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseIntercept, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
