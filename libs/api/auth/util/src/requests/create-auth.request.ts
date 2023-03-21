import { UserRecord } from 'firebase-admin/auth';

export interface ICreateAuthRequest {
  userRecord: UserRecord;
}
