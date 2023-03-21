import { IUpdateAccountDetailsRequest } from '../requests';

export class UpdateAccountDetailsCommand {
  constructor(public readonly request: IUpdateAccountDetailsRequest) {}
}
