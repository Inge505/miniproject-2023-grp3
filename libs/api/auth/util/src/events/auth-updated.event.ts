import { IAuth } from '../interfaces';

export class AuthUpdatedEvent {
  constructor(public readonly auth: IAuth) {}
}
