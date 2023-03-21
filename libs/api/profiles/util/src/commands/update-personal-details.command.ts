import { IUpdatePersonalDetailsRequest } from '../requests';

export class UpdatePersonalDetailsCommand {
  constructor(public readonly request: IUpdatePersonalDetailsRequest) {}
}
