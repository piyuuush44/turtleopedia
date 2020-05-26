import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CamelToSentanceCasePipe} from './camel-to-sentance-case.pipe';
import {ActiveClassDirective} from './active-class.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [
    CamelToSentanceCasePipe,
    ActiveClassDirective
  ],
  imports: [
    CommonModule,
    NgbModule, FormsModule, ReactiveFormsModule, GooglePlaceModule
  ],
  exports: [
    CommonModule, CamelToSentanceCasePipe,
    NgbModule, FormsModule, ReactiveFormsModule, GooglePlaceModule
  ]
})
export class SharedModule {
}
