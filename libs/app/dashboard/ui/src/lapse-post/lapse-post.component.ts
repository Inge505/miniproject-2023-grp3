import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lapse-post',
  templateUrl: './lapse-post.component.html',
  styleUrls: ['./lapse-post.component.scss'],
})
export class LapsePostComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("");
  }

  bid() {
    console.log("bid");
  }
  like() {
    console.log("like");
  }
  comment() {
    this.router.navigate(["/comment"]);
  }
}