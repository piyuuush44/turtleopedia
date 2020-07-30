import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[appAdLoadScript]'
})
export class LoadAdScriptDirective implements AfterViewInit {

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {
        const node = document.createElement('script');
        node.src = 'https://insnative.com/na/waWQiOjEwNTE3NDYsInNpZCI6MTA1NjU2Miwid2lkIjoxMTMwNjAsInNyYyI6Mn0=eyJ.js';
        node.type = 'text/javascript';
        node.async = true;
        this.el.nativeElement.appendChild(node);
    }

}
