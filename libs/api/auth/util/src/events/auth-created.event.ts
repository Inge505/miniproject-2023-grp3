import { IAuth } from '../interfaces';

export class AuthCreatedEvent {
  constructor(public readonly auth: IAuth) {}
}
