import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {WebdataModel} from '../model/webdata.model';
import {AppState} from '../../store/app.reducer';
import {coreStateWebsiteDataSelector} from '../store/core.selector';
import {select, Store} from '@ngrx/store';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    @ViewChild('advertisement') editor: ElementRef<HTMLElement>;

    script = '<script type="text/javascript" src="https://www.topdisplaynetwork.com/eb5e935bad1970b8efd3a3435a711be1/invoke.js"></script>';
    data: WebdataModel = new WebdataModel([], [], [], ['lifestyle']);

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngAfterViewInit() {
        this.editor.nativeElement.innerHTML = this.script;
    }

    ngOnInit(): void {
        this.store.pipe(select(coreStateWebsiteDataSelector)).subscribe(
            value => {
                this.data = value;
            }
        );
    }

}
