import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lapse-post',
  templateUrl: './lapse-post.component.html',
  styleUrls: ['./lapse-post.component.scss'],
})
export class LapsePostComponent  implements OnInit {

  constructor(private router: Router) { }

  @Input() username = `username`;
  @Input() profilePicture = `https://ionicframework.com/docs/img/demos/avatar.svg`;
  @Input() postTitle = `Default Title`;
  @Input() postImage = `assets/images/landscape.jpg`;

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