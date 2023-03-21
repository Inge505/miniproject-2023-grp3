import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { UpdateContactDetails } from '@mp/app/profile/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile-contact-details-component',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(actionsExecuting([UpdateContactDetails]))
  busy$!: Observable<ActionsExecuting>;
  contactDetailsForm = this.fb.group({
    cellphone: ['', [Validators.minLength(6), Validators.maxLength(64)]],
  });
  showPassword = false;

  get cellphone() {
    return this.contactDetailsForm.get('cellphone');
  }

  get cellphoneError(): string {
    if (this.cellphone?.errors?.['required']) return 'Cellphone is required';
    if (this.cellphone?.errors?.['minlength'])
      return 'Cellphone should be longer than 6 characters';
    if (this.cellphone?.errors?.['maxlength'])
      return 'Cellphone should be shorter than 64 characters';

    return 'Cellphone is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  updateContactDetails() {
    this.store.dispatch(new UpdateContactDetails());
  }
}
