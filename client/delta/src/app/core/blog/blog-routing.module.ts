import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SingleviewComponent} from "./singleview/singleview.component";
import {BlogComponent} from "./blog.component";
import {HomeComponent} from "./home/home.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ContactComponent} from "./contact/contact.component";


const routes: Routes = [
  {
    path: 'blog', component: BlogComponent, children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'singleBlog', component: SingleviewComponent
      },
      {
        path: 'category', component: CategoriesComponent
      },
      {
        path: 'contact', component: ContactComponent
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
