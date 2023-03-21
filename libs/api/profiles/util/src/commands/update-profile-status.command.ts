import { IUpdateProfileStatusRequest } from '../requests';

export class UpdateProfileStatusCommand {
  constructor(public readonly request: IUpdateProfileStatusRequest) {}
}
