import { IProfile } from '../interfaces';

export class OccupationDetailsUpdatedEvent {
  constructor(public readonly profile: IProfile) {}
}
