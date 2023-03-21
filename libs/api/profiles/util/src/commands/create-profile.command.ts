import { ICreateProfileRequest } from '../requests';

export class CreateProfileCommand {
  constructor(public readonly request: ICreateProfileRequest) {}
}
