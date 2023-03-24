import { IProfile } from '../interfaces';

export class PostDetailsUpdatedEvent {
  constructor(public readonly profile: IProfile) {}
}
