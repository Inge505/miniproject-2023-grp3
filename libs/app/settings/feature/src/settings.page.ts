import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logout } from '@mp/app/profile/util';
import { Store } from '@ngxs/store';


@Component({
  selector: 'mp-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private router: Router,
    private readonly store: Store
    ) { }


  ngOnInit() {
    console.log("");
  }

  toProfilePage() {
    this.router.navigate(["/profile"]);
  }

  logOut(){
    console.log("Sorry to see you go :(");
    this.store.dispatch(new Logout());

  }
}
