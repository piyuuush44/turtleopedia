import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {ListboxComponent} from './listbox/listbox.component';
import {SaveblogComponent} from './saveblog/saveblog.component';
import {BlogService} from './blog.service';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {BlogReducer} from './store/blog.reducer';
import {EffectsModule} from '@ngrx/effects';
import {BlogEffects} from './store/blog.effects';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    ListboxComponent,
    SaveblogComponent,
  ],
  imports: [
    CKEditorModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature('blogState', BlogReducer),
    EffectsModule.forFeature([BlogEffects]),
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule {
}
