import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[appLoadScriptYlink]'
})
export class LoadScriptYlinkDirective implements AfterViewInit {
    //3*1 ad
    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {
        const node = document.createElement('script');
        node.src = '//uprimp.com/bnr.php?section=General&pub=833432&format=300x250&ga=g';
        node.type = 'text/javascript';
        node.async = true;
        this.el.nativeElement.appendChild(node);
    }

}
