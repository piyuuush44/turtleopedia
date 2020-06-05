import {Component, OnInit} from '@angular/core';
import {WebdataModel} from "../../model/webdata.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {coreStateSelecter} from "../../store/core.selector";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: WebdataModel = new WebdataModel([], [], [], []);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(coreStateSelecter)).subscribe(
      value => {
        this.data = value
        console.log(this.data)
      }
    )
  }
}
