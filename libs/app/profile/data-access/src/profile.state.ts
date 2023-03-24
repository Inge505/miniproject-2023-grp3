import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    AgeGroup,
    Ethnicity,
    Gender,
    HouseholdIncome,
    IProfile,
    IUpdateAccountDetailsRequest,
    IUpdatePostDetailsRequest,
    IUpdateAddressDetailsRequest,
    IUpdateContactDetailsRequest,
    IUpdateOccupationDetailsRequest,
    IUpdatePersonalDetailsRequest,
} from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    Logout,
    SetProfile,
    SubscribeToProfile,
    UpdateAccountDetails,
    UpdateAddressDetails,
    UpdateContactDetails,
    UpdateOccupationDetails,
    UpdatePersonalDetails,
    UpdatePostDetails,
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { debounceTime, tap } from 'rxjs';
import { ProfilesApi } from './profiles.api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileStateModel {
  profile: IProfile | null;
  accountDetailsForm: {
    model: {
      displayName: string | null;
      email: string | null;
      photoURL: string | null;
      password: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
  postDetailsForm: {
    model: {
      comment: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
  addressDetailsForm: {
    model: {
      residentialArea: string | null;
      workArea: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
  contactDetailsForm: {
    model: {
      cellphone: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
  personalDetailsForm: {
    model: {
      age: AgeGroup | null;
      gender: Gender | null;
      ethnicity: Ethnicity | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
  occupationDetailsForm: {
    model: {
      householdIncome: HouseholdIncome | null;
      occupation: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null,
    accountDetailsForm: {
      model: {
        displayName: null,
        email: null,
        photoURL: null,
        password: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
    postDetailsForm: {
      model: {
        comment: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
    addressDetailsForm: {
      model: {
        residentialArea: null,
        workArea: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
    contactDetailsForm: {
      model: {
        cellphone: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
    personalDetailsForm: {
      model: {
        age: null,
        gender: null,
        ethnicity: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
    occupationDetailsForm: {
      model: {
        householdIncome: null,
        occupation: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class ProfileState {
  constructor(
    private readonly profileApi: ProfilesApi,
    private readonly store: Store
  ) { this.subscribeToPostDetailsForm();}

  @Selector()
  static profile(state: ProfileStateModel) {
    return state.profile;
  }

  @Selector()
static postDetailsForm(state: ProfileStateModel) {
  return state.postDetailsForm;
}
getCommentByUserId(userId: string): Observable<string | null> {
  return this.profileApi
    .profile$(userId)
    .pipe(map((profile: IProfile) => profile.postDetails?.comment ?? null));
}
subscribeToPostDetailsForm() {
  this.store
    .select(ProfileState.postDetailsForm)
    .pipe(debounceTime(500))
    .subscribe((postDetailsForm) => {
      if (postDetailsForm.dirty) {
        this.store.dispatch(new UpdatePostDetails());
      }
    });
}

  @Action(Logout)
  async logout(ctx: StateContext<ProfileStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  @Action(SubscribeToProfile)
  subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    return this.profileApi
      .profile$(user.uid)
      .pipe(tap((profile: IProfile) => ctx.dispatch(new SetProfile(profile))));
  }

  @Action(SetProfile)
  setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
    return ctx.setState(
      produce((draft) => {
        draft.profile = profile;
      })
    );
  }


  @Action(UpdateAccountDetails)
  async updateAccountDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const displayName = state.accountDetailsForm.model.displayName;
      const email = state.accountDetailsForm.model.email;
      // const photoURL = state.accountDetailsForm.model.photoURL;
      const password = state.accountDetailsForm.model.password;

      if (!userId || !displayName || !email || !password)
        return ctx.dispatch(
          new SetError(
            'UserId or display name or email or photo URL or password not set'
          )
        );

      const request: IUpdateAccountDetailsRequest = {
        profile: {
          userId,
          accountDetails: {
            displayName,
            email,
            password,
          },
        },
      };
      const responseRef = await this.profileApi.updateAccountDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdatePostDetails)
  async updatePostDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const comment = state.postDetailsForm.model.comment;

      if (!userId || !comment)
        return ctx.dispatch(new SetError('UserId or cellphone not set'));

      const request: IUpdatePostDetailsRequest = {
        profile: {
          userId,
          postDetails: {
            comment,
          },
        },
      };
      const responseRef = await this.profileApi.updatePostDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
  @Action(UpdateContactDetails)
  async updateContactDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const cellphone = state.contactDetailsForm.model.cellphone;

      if (!userId || !cellphone)
        return ctx.dispatch(new SetError('UserId or cellphone not set'));

      const request: IUpdateContactDetailsRequest = {
        profile: {
          userId,
          contactDetails: {
            cellphone,
          },
        },
      };
      const responseRef = await this.profileApi.updateContactDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateAddressDetails)
  async updateAddressDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const residentialArea = state.addressDetailsForm.model.residentialArea;
      const workArea = state.addressDetailsForm.model.workArea;

      if (!userId || !residentialArea || !workArea)
        return ctx.dispatch(
          new SetError('UserId or residential area or work area not set')
        );

      const request: IUpdateAddressDetailsRequest = {
        profile: {
          userId,
          addressDetails: {
            residentialArea,
            workArea,
          },
        },
      };
      const responseRef = await this.profileApi.updateAddressDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdatePersonalDetails)
  async updatePersonalDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const age = state.personalDetailsForm.model.age;
      const gender = state.personalDetailsForm.model.gender;
      const ethnicity = state.personalDetailsForm.model.ethnicity;

      if (!userId || !age || !gender || !ethnicity)
        return ctx.dispatch(
          new SetError('UserId or age or gender or ethnicity not set')
        );

      const request: IUpdatePersonalDetailsRequest = {
        profile: {
          userId,
          personalDetails: {
            age,
            gender,
            ethnicity,
          },
        },
      };
      const responseRef = await this.profileApi.updatePersonalDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateOccupationDetails)
  async updateOccupationDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const householdIncome = state.occupationDetailsForm.model.householdIncome;
      const occupation = state.occupationDetailsForm.model.occupation;

      if (!userId || !householdIncome || !occupation)
        return ctx.dispatch(
          new SetError('UserId or householdIncome or occupation not set')
        );

      const request: IUpdateOccupationDetailsRequest = {
        profile: {
          userId,
          occupationDetails: {
            householdIncome,
            occupation,
          },
        },
      };
      const responseRef = await this.profileApi.updateOccupationDetails(
        request
      );
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
