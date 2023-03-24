import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile-status-component',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.scss'],
})
export class ProfileStatusComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  comment$!: Observable<string | null>;
  userId = "M6rAQt7sOtbxUKB82I4d5065U5Ob";
  constructor(private profileState: ProfileState) {}

  ngOnInit(): void {
    if (this.userId) {
      this.comment$ = this.profileState.getCommentByUserId(this.userId);
    }
  }
}
