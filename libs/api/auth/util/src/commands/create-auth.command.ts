import { ICreateAuthRequest } from '../requests';

export class CreateAuthCommand {
  constructor(public readonly request: ICreateAuthRequest) {}
}
