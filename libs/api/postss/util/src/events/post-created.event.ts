import { IPost } from '../interfaces';

export class PostCreatedEvent {
  constructor(public readonly profile: IPost) {}
}
