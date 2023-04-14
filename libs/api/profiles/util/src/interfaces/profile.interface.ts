import { Timestamp } from 'firebase-admin/firestore';
import { ProfileStatus } from '../enums';
import { IAccountDetails } from './account-details.interface';
import { IAddressDetails } from './address-details.interface';
import { IContactDetails } from './contact-details.interface';
import { IOccupationDetails } from './occupation-details.interface';
import { IPersonalDetails } from './personal-details.interface';
import { IUserSettings } from './user-settings.interface';
import {IPost} from "@mp/api/postss/util";

export interface IProfile {
  username: string;
  bio: string | null;
  emailAddress: string;
  posts?: IPost[] | null | undefined;
  profilePicture?: string | null | undefined;
  timeBalance?: number;
  lastLogin?: Timestamp | null;
  followers?: IProfile[] | null | undefined;
  following?: IProfile[] | null | undefined;
  userSettings?: IUserSettings[] | null;
}

  //accountDetails?: IAccountDetails | null | undefined;
  //personalDetails?: IPersonalDetails | null | undefined;
  //contactDetails?: IContactDetails | null | undefined;
  //addressDetails?: IAddressDetails | null | undefined;
  //occupationDetails?: IOccupationDetails | null | undefined;
  //status?: ProfileStatus | null | undefined;
  //created?: Timestamp | null | undefined;
