import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[appAdLoadScript]'
})
export class LoadAdScriptDirective implements AfterViewInit {

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {
        const node = document.createElement('script');
        node.src = 'https://www.topdisplaynetwork.com/6ef12e1a3b2a9b1784c7e7d57421e05c/invoke.js';
        node.type = 'text/javascript';
        node.async = true;
        this.el.nativeElement.appendChild(node);
    }

}
