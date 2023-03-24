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

  toHomePage() {
    this.router.navigate(["/home"]);
  }
  toSearchPage() {
    this.router.navigate(["/search"]);
  }
  toCreatePage() {
    this.router.navigate(["/create"]);
  }
  toPortfolioPage() {
    this.router.navigate(["/portfolio"]);
  }
  toProfilePage() {
    this.router.navigate(["/profile-page"]);
  }
}
