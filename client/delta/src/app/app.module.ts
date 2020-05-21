import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {ResponseIntercept} from "./shared/response.intercept";
import {LoaderInterceptorService} from "./shared/loader.interceptor";
import { BlogComponent } from './core/blog/blog.component';
import { HomeComponent } from './core/blog/home/home.component';
import { SingleviewComponent } from './core/blog/singleview/singleview.component';
import { ContactComponent } from './core/blog/contact/contact.component';
import { CategoryComponent } from './core/blog/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent,
    SingleviewComponent,
    ContactComponent,
    CategoryComponent
  ],
  imports: [
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
