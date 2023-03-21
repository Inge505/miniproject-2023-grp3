import { IProfile } from '../interfaces';

export class PersonalDetailsUpdatedEvent {
  constructor(public readonly profile: IProfile) {}
}
