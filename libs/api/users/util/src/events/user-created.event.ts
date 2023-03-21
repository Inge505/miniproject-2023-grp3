import { IUser } from '../interfaces';

export class UserCreatedEvent {
  constructor(public readonly user: IUser) {}
}
