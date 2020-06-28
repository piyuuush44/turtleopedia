import {Component, OnInit} from '@angular/core';
import {WebdataModel} from "../../../../../delta_old/src/app/core/model/webdata.model";
import {AppState} from "../../../../../delta_old/src/app/store/app.reducer";
import {coreStateWebsiteDataSelector} from "../../../../../delta_old/src/app/core/store/core.selector";
import {select, Store} from "@ngrx/store";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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
