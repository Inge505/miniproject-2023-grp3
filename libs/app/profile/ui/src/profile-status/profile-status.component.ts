import { Component } from '@angular/core';
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
}
