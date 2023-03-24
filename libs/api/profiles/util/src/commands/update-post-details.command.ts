import { IUpdatePostDetailsRequest } from '../requests';

export class UpdatePostDetailsCommand {
  constructor(public readonly request: IUpdatePostDetailsRequest) {
    console.log("checkkkkk in util commands");
  }
}
