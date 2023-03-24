import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { UpdatePostDetails } from '@mp/app/profile/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile-post-details-component',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(actionsExecuting([UpdatePostDetails]))
  busy$!: Observable<ActionsExecuting>;
  postDetailsForm = this.fb.group({
    comment: ['', [Validators.minLength(2), Validators.maxLength(64)]]
  });
  showPassword = false;

  get comment() {
    return this.postDetailsForm.get('comment');
  }

  get commentError(): string {
    if (this.comment?.errors?.['required'])
      return 'Display name is required';
    if (this.comment?.errors?.['minlength'])
      return 'Display name should be longer than 6 characters';
    if (this.comment?.errors?.['maxlength'])
      return 'Display name should be shorter than 64 characters';

    return 'Display name is invalid';
  }


  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}


  updatePostDetails() {
    this.store.dispatch(new UpdatePostDetails());
  }
}
