import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListboxComponent} from "./listbox/listbox.component";


const routes: Routes = [
  {
    path: 'list', component: ListboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
