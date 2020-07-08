import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebdataModel} from '../model/webdata.model';
import {AppState} from '../../store/app.reducer';
import {coreStateWebsiteDataSelector} from '../store/core.selector';
import {select, Store} from '@ngrx/store';

declare var $: any;

@Component({
    selector: 'app-masonrybox',
    templateUrl: './masonrybox.component.html',
    styleUrls: ['./masonrybox.component.css']
})
export class MasonryboxComponent implements OnInit, AfterViewInit {
    @ViewChild('carousel') el: ElementRef;
    data: WebdataModel = new WebdataModel([], [], [], ['lifestyle']);

    constructor(private store: Store<AppState>) {
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
        this.store.pipe(select(coreStateWebsiteDataSelector)).subscribe(
            value => {
                this.data = value;
            }
        );
    }
}
