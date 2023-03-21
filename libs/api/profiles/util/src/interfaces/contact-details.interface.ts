import { ProfileStatus } from '../enums';

export interface IContactDetails {
  cellphone?: string | null | undefined;
  status?: ProfileStatus | null | undefined;
}
