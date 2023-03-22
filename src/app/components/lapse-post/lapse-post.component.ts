import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lapse-post',
  templateUrl: './lapse-post.component.html',
  styleUrls: ['./lapse-post.component.scss'],
})
export class LapsePostComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  bid() {
    console.log("bid");
  }
  like() {
    console.log("like");
  }
  comment() {
    console.log("comment");
  }
}
