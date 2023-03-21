import { IUpdateOccupationDetailsRequest } from '../requests';

export class UpdateOccupationDetailsCommand {
  constructor(public readonly request: IUpdateOccupationDetailsRequest) {}
}
