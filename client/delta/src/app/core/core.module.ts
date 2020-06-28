import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CoreComponent} from './core.component';
import {SingleviewComponent} from './singleview/singleview.component';
import {CategoryComponent} from './category/category.component';
import {LoaderComponent} from './loader/loader.component';
import {MasonryboxComponent} from './masonrybox/masonrybox.component';
import {AdvertisementComponent} from './advertisement/advertisement.component';
import {SearchboxComponent} from './searchbox/searchbox.component';


@NgModule({
    declarations: [HomeComponent, HeaderComponent, FooterComponent, SidebarComponent, CoreComponent, SingleviewComponent, CategoryComponent, LoaderComponent, MasonryboxComponent, AdvertisementComponent, SearchboxComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
    ]
})
export class CoreModule {
}
