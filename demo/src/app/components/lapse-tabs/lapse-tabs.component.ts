import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lapse-tabs',
  templateUrl: './lapse-tabs.component.html',
  styleUrls: ['./lapse-tabs.component.scss'],
})
export class LapseTabsComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  toSearchPage() {
    this.router.navigate(["/search"]);
  }
}
