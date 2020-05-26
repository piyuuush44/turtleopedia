import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appActiveClass]'
})
export class ActiveClassDirective {
  constructor() {
  }

  @HostBinding('class.active') isActive = false;

  @HostListener('click') toggleOpen() {
    this.isActive = !this.isActive;
  }

}

