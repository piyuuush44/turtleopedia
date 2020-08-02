import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[appAdLoadScript]'
})
export class LoadAdScriptDirective implements AfterViewInit {
    // its a 1*1 ad

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {
        const node = document.createElement('script');
        node.src = 'https://insnative.com/na/waWQiOjEwNTE3NDYsInNpZCI6MTA1NjU2Miwid2lkIjoxMTMwNjcsInNyYyI6Mn0=eyJ.js';
        node.type = 'text/javascript';
        node.async = true;
        this.el.nativeElement.appendChild(node);
    }

}
