import { ProfileStatus } from '../enums';

export interface IAddressDetails {
  residentialArea?: string | null | undefined;
  workArea?: string | null | undefined;
  status?: ProfileStatus | null | undefined;
}
