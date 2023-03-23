import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toHomePage(){
    this.router.navigate(["/home"]);
  }
  fillBar(category: string){
    console.log(category);
   var searchBar=document.getElementById("searchBar")?.setAttribute("value", category);
  }
}
