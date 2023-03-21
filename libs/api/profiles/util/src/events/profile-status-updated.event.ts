import { IProfile } from '../interfaces';

export class ProfileStatusUpdatedEvent {
  constructor(public readonly profile: IProfile) {}
}
