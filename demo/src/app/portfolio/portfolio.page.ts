import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  toHomePage() {
    this.router.navigate(["/home"]);
  }
}
