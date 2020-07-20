import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebdataModel} from '../model/webdata.model';
import {AppState} from '../../store/app.reducer';
import {coreStateWebsiteDataSelector} from '../store/core.selector';
import {select, Store} from '@ngrx/store';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @ViewChild('advertisement') editor: ElementRef<HTMLElement>;

    data: WebdataModel = new WebdataModel([], [], [], ['lifestyle']);

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit(): void {
        this.store.pipe(select(coreStateWebsiteDataSelector)).subscribe(
            value => {
                this.data = value;
            }
        );
    }

}
