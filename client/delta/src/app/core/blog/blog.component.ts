import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  showMasonBox = false;

  constructor(public router: Router, private location: Location) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      value => {
        this.showMasonBox = this.location.path() === '/blog/home'
      }
    )

  }

}
