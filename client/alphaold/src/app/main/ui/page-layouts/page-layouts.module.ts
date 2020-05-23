import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';

import { CardedFullWidthTabbed1Component } from 'app/main/ui/page-layouts/carded/full-width-tabbed-1/full-width-tabbed-1.component';

import { FuseSidebarModule } from '@fuse/components';

const routes: Routes = [
    // Carded
    {
        path     : 'page-layouts/carded/full-width-tabbed-1',
        component: CardedFullWidthTabbed1Component
    }
];

@NgModule({
    declarations: [
        CardedFullWidthTabbed1Component,
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        FuseSidebarModule,
        FuseSharedModule,
        FuseDemoModule
    ]
})
export class UIPageLayoutsModule
{
}
