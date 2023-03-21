import { IProfile } from '../interfaces';

export class AddressDetailsUpdatedEvent {
  constructor(public readonly profile: IProfile) {}
}
