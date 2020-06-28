import {Component, OnInit} from '@angular/core';
import {blogCategories} from '../../shared/constants';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    data: Array<string>;

    constructor() {
    }

    ngOnInit(): void {
        this.data = blogCategories;
    }

}
