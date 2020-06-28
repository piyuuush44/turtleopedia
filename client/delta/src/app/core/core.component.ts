import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-core',
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit(): void {
    }

}
