import { ProfileStatus } from '../enums';

export interface IAccountDetails {
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  photoURL?: string | null | undefined;
  password?: string | null | undefined;
  status?: ProfileStatus | null | undefined;
}
