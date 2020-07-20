import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';
import { SingleviewComponent } from './singleview/singleview.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
    {
        path: 'b', component: CoreComponent, children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'singleBlog/:slug_url', component: SingleviewComponent
            },
            {
                path: 'category/:category_id', component: CategoryComponent
            },
            {
                path: 'contact', component: ContactComponent
            },
            {
                path: 'about-us', component: AboutusComponent
            },
            {
                path: 'privacy-policy', component: PrivacypolicyComponent
            },
        ]
    },
    {
        path: '**', component: NotfoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
