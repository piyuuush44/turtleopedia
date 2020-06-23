import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CamelToSentanceCasePipe} from './camel-to-sentance-case.pipe';
import {ActiveClassDirective} from './active-class.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CamelToSentanceCasePipe,
    ActiveClassDirective
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    CommonModule, CamelToSentanceCasePipe,
    FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule {
}
