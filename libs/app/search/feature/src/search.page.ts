
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { IPostDetails, IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FetchUserPosts, GetAllPosts, GetUserPostsByHashtag } from '@mp/app/profile/util';
import { Logout } from '@mp/app/auth/util';


@Component({
  selector: 'mp-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  private profileSubscription!: Subscription;
  constructor(private router: Router, private store: Store) { this.profileSubscription = this.profile$.subscribe((profile) => {
    if (profile && profile.time === 0) {
      // User's time reached 0, log them out
      this.store.dispatch(new Logout());
    }
  });
}

ngOnDestroy() {
  // Clean up the subscription when the component is destroyed
  if (this.profileSubscription) {
    this.profileSubscription.unsubscribe();
  }
}
  @Select(ProfileState.searchPosts) searchPosts$: Observable<IPostDetails[]> | undefined;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  searchUser='';
  // userSearch(){
  //   console.log(this.searchUser);
  //   this.store.dispatch(new FetchUserPosts(this.searchUser));
  // }
  errorMessage: string | null = null;

  userSearch() {
    if (this.searchUser.startsWith('#')) {
      this.searchByHashtag();
    } else {
      console.log(this.searchUser);
      this.store.dispatch(new FetchUserPosts(this.searchUser));
    }
  } //if the input starts with a hashtag, search by hashtag, else search by username

  toHomePage(){
    this.router.navigate(["/home"]);
  }
  fillBar(category: string){

    this.searchUser=category;
    console.log(category);
   document.getElementById("searchBar")?.setAttribute("value", category);
   this.userSearch();
  }

  searchByHashtag() {
    const hashtag = this.searchUser;
    console.log('Searching by hashtag:', hashtag);
    this.store.dispatch(new GetUserPostsByHashtag(hashtag)).subscribe({
      error: (err) => {
        console.log('Error:', err.message);
      },
    });
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
    this.router.navigate(["/profile"]);
  }
}
