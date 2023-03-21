import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router : Router) {}

  logout(){
    this.router.navigate(['/login']);
  }
  like(){
    console.log("Liked post");
  }
  dislike(){
    console.log("Disliked post");
  }
  comment(){
    console.log("Commented on post");
  }
  bid(){
    console.log("Bid on post");
  }
}
