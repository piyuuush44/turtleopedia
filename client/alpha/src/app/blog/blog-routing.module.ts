import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListboxComponent} from './listbox/listbox.component';
import {SaveblogComponent} from './saveblog/saveblog.component';
import {AuthGuardService} from '../auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'list', component: ListboxComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'save', component: SaveblogComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'edit/:id', component: SaveblogComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// @ts-ignore
export class BlogRoutingModule {
}
