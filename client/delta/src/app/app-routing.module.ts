import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotfoundComponent} from "./core/notfound/notfound.component";

const routes: Routes = [
    {path: '', redirectTo: '/b/home', pathMatch: 'full'},
    {
        path: '**', component: NotfoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
