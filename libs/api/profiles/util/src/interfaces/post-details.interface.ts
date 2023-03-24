import { ProfileStatus } from '../enums';

export interface IPostDetails {
  comment?: string | null | undefined;
  status?: ProfileStatus | null | undefined;
}
