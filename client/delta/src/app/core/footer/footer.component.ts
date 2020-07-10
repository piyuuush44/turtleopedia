import {Component, OnInit} from '@angular/core';
import {WebdataModel} from '../model/webdata.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {coreStateWebsiteDataSelector} from '../store/core.selector';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    data: WebdataModel = new WebdataModel([], [], [], ['lifestyle']);

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.pipe(select(coreStateWebsiteDataSelector)).subscribe(
            value => {
                this.data = value;
            }
        );
    }

}
