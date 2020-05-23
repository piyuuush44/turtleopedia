import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogComponent} from "./blog.component";
import {SaveComponent} from "./save/save.component";


const routes: Routes = [
    // {
    //     path: 'save', component: SaveComponent
    // },
    {
        path: '**', component: BlogComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule {
}
