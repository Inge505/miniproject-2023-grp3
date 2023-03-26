import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toHomePage() {
    this.router.navigate(["/home"]);
  }

  activeTextArea(){
  
  }

  send(){

    if(document.getElementsByTagName("textarea")[0].value==""){
      console.log("Cannot send empty comment");
      return;
    }
    console.log("sent comment!");
    document.getElementsByTagName("textarea")[0].value="";
  }

  clear(){
    document.getElementsByTagName("textarea")[0].value="";
  }

  like(event: any){
      console.log("Liked!");
  }

}
