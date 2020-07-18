import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebdataModel} from '../model/webdata.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {coreStateWebsiteDataSelector} from '../store/core.selector';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
    @ViewChild('advertisement') editor: ElementRef<HTMLElement>;
    script = '<script type="text/javascript" src="https://www.topdisplaynetwork.com/6ef12e1a3b2a9b1784c7e7d57421e05c/invoke.js"></script>';

    data: WebdataModel = new WebdataModel([], [], [], ['lifestyle']);

    constructor(private store: Store<AppState>) {
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
