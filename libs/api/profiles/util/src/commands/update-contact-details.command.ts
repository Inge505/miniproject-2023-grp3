import { IUpdateContactDetailsRequest } from '../requests';

export class UpdateContactDetailsCommand {
  constructor(public readonly request: IUpdateContactDetailsRequest) {}
}
