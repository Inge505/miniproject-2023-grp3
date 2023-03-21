import { IUpdateAuthRequest } from '../requests';

export class UpdateAuthCommand {
  constructor(public readonly request: IUpdateAuthRequest) {}
}
