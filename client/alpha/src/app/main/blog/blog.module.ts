import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {SaveComponent} from "./save/save.component";
import {BlogComponent} from "./blog.component";
import {MatTabsModule} from "@angular/material/tabs";
import {FuseDemoModule} from "../../../@fuse/components";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
    declarations: [
        BlogComponent,
        SaveComponent
    ],
    imports: [
        CommonModule,
        BlogRoutingModule,

        MatTabsModule,
        FuseDemoModule,
        FlexModule
    ]
})
export class BlogModule {
}
