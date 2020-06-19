import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListboxComponent} from "./listbox/listbox.component";
import {SaveblogComponent} from "./saveblog/saveblog.component";


const routes: Routes = [
  {
    path: 'list', component: ListboxComponent
  },
  {
    path: 'save', component: SaveblogComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
