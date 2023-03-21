import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { UpdateOccupationDetails } from '@mp/app/profile/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile-occupation-details-component',
  templateUrl: './occupation-details.component.html',
  styleUrls: ['./occupation-details.component.scss'],
})
export class OccupationDetailsComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(actionsExecuting([UpdateOccupationDetails]))
  busy$!: Observable<ActionsExecuting>;
  occupationDetailsForm = this.fb.group({
    householdIncome: ['', [Validators.minLength(4), Validators.maxLength(64)]],
    occupation: ['', [Validators.minLength(4), Validators.maxLength(64)]],
  });
  showPassword = false;

  get householdIncome() {
    return this.occupationDetailsForm.get('householdIncome');
  }

  get occupation() {
    return this.occupationDetailsForm.get('occupation');
  }

  get householdIncomeError(): string {
    if (this.householdIncome?.errors?.['required'])
      return 'Household income is required';
    if (this.householdIncome?.errors?.['minlength'])
      return 'Household income should be longer than 4 characters';
    if (this.householdIncome?.errors?.['maxlength'])
      return 'Household income should be shorter than 64 characters';

    return 'Household income is invalid';
  }

  get occupationError(): string {
    if (this.occupation?.errors?.['required']) return 'Occupation is required';
    if (this.occupation?.errors?.['minlength'])
      return 'Occupation should be longer than 4 characters';
    if (this.occupation?.errors?.['maxlength'])
      return 'Occupation should be shorter than 64 characters';

    return 'Occupation is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  updateOccupationDetails() {
    this.store.dispatch(new UpdateOccupationDetails());
  }
}
