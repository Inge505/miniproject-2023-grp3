import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { UpdateAddressDetails } from '@mp/app/profile/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile-address-details-component',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(actionsExecuting([UpdateAddressDetails]))
  busy$!: Observable<ActionsExecuting>;
  addressDetailsForm = this.fb.group({
    residentialArea: ['', [Validators.minLength(6), Validators.maxLength(64)]],
    workArea: ['', [Validators.minLength(6), Validators.maxLength(64)]],
  });
  showPassword = false;

  get residentialArea() {
    return this.addressDetailsForm.get('residentialArea');
  }

  get workArea() {
    return this.addressDetailsForm.get('workArea');
  }

  get residentialAreaError(): string {
    if (this.residentialArea?.errors?.['required'])
      return 'Residential area is required';
    if (this.residentialArea?.errors?.['minlength'])
      return 'Residential area should be longer than 6 characters';
    if (this.residentialArea?.errors?.['maxlength'])
      return 'Residential area should be shorter than 64 characters';

    return 'Residential area is invalid';
  }

  get workAreaError(): string {
    if (this.workArea?.errors?.['required']) return 'Work area is required';
    if (this.workArea?.errors?.['minlength'])
      return 'Work area should be longer than 6 characters';
    if (this.workArea?.errors?.['maxlength'])
      return 'Work area should be shorter than 64 characters';

    return 'Work area is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  updateAddressDetails() {
    this.store.dispatch(new UpdateAddressDetails());
  }
}
