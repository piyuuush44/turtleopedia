import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from "./blog.component";
import {HomeComponent} from "./home/home.component";
import {SingleviewComponent} from "./singleview/singleview.component";
import {ContactComponent} from "./contact/contact.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AdvertisingComponent} from "./advertising/advertising.component";
import {MasonryBoxComponent} from "./masonry-box/masonry-box.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {BlogService} from "./blog.service";
import { AboutusComponent } from './aboutus/aboutus.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';


@NgModule({
  declarations: [
    BlogComponent,
    HomeComponent,
    SingleviewComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    AdvertisingComponent,
    MasonryBoxComponent,
    SidebarComponent,
    AboutusComponent,
    PrivacypolicyComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule {
}
