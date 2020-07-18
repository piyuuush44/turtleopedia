import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[appLoadScript]'
})
export class LoadScriptDirective implements AfterViewInit {

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {
        const node = document.createElement('script');
        node.src = 'https://www.topdisplaynetwork.com/eb5e935bad1970b8efd3a3435a711be1/invoke.js';
        node.type = 'text/javascript';
        node.async = true;
        this.el.nativeElement.appendChild(node);
    }

}
