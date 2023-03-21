import { IProfile } from '../interfaces';

export class ContactDetailsUpdatedEvent {
  constructor(public readonly profile: IProfile) {}
}
