import { IProfile } from '../interfaces';

export class ProfileCreatedEvent {
  constructor(public readonly profile: IProfile) {}
}
