import {Component, OnInit} from '@angular/core';
import {WebdataModel} from "../../model/webdata.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {coreStateSelecter} from "../../store/core.selector";
import {Observable} from "rxjs";

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
    console.log('first ', this.data)
    this.store.pipe(select(coreStateSelecter)).subscribe(
      value => {
        this.data = value
        console.log('second', this.data)

      }
    )
  }
}
