import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SingleviewComponent} from "./singleview/singleview.component";
import {BlogComponent} from "./blog.component";
import {HomeComponent} from "./home/home.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutusComponent} from "./aboutus/aboutus.component";
import {PrivacypolicyComponent} from "./privacypolicy/privacypolicy.component";


const routes: Routes = [
  {
    path: 'blog', component: BlogComponent, children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'singleBlog/:slug_url', component: SingleviewComponent
      },
      {
        path: 'category/:category_id', component: CategoriesComponent
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
