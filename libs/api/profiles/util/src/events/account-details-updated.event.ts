import { IProfile } from '../interfaces';

export class AccountDetailsUpdatedEvent {
  constructor(public readonly profile: IProfile) {}
}
