import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-masonrybox',
    templateUrl: './masonrybox.component.html',
    styleUrls: ['./masonrybox.component.css']
})
export class MasonryboxComponent implements OnInit, AfterViewInit {
    @ViewChild('carousel') el: ElementRef;

    constructor() {
    }

    ngAfterViewInit(): void {
        $(this.el.nativeElement).owlCarousel({
                loop: true,
                nav: true,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                animateIn: 's',
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 1,
                        margin: 20
                    },
                    992: {
                        items: 1,
                        margin: 30
                    }
                }
            }
        );
    }

    ngOnInit(): void {
    }
}
