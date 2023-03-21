import { IUpdateAddressDetailsRequest } from '../requests';

export class UpdateAddressDetailsCommand {
  constructor(public readonly request: IUpdateAddressDetailsRequest) {}
}
