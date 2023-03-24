import {
    IUpdateAccountDetailsRequest,
    IUpdateAccountDetailsResponse,
    IUpdatePostDetailsRequest,
    IUpdatePostDetailsResponse,
    IUpdateAddressDetailsRequest,
    IUpdateAddressDetailsResponse,
    IUpdateContactDetailsRequest,
    IUpdateContactDetailsResponse,
    IUpdateOccupationDetailsRequest,
    IUpdateOccupationDetailsResponse,
    IUpdatePersonalDetailsRequest,
    IUpdatePersonalDetailsResponse,
    UpdateAccountDetailsCommand,
    UpdatePostDetailsCommand,
    UpdateAddressDetailsCommand,
    UpdateContactDetailsCommand,
    UpdateOccupationDetailsCommand,
    UpdatePersonalDetailsCommand
} from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class ProfilesService {
  constructor(private readonly commandBus: CommandBus) {}

  async updateAccountDetails(
    request: IUpdateAccountDetailsRequest
  ): Promise<IUpdateAccountDetailsResponse> {
    return await this.commandBus.execute<
      UpdateAccountDetailsCommand,
      IUpdateAccountDetailsResponse
    >(new UpdateAccountDetailsCommand(request));
  }

  async updatePostDetails(
    request: IUpdatePostDetailsRequest
  ): Promise<IUpdatePostDetailsResponse> {
    return await this.commandBus.execute<
      UpdatePostDetailsCommand,
      IUpdatePostDetailsResponse
    >(new UpdatePostDetailsCommand(request));
  }

  async updateAddressDetails(
    request: IUpdateAddressDetailsRequest
  ): Promise<IUpdateAddressDetailsResponse> {
    return await this.commandBus.execute<
      UpdateAddressDetailsCommand,
      IUpdateAddressDetailsResponse
    >(new UpdateAddressDetailsCommand(request));
  }

  async updateContactDetails(
    request: IUpdateContactDetailsRequest
  ): Promise<IUpdateContactDetailsResponse> {
    return await this.commandBus.execute<
      UpdateContactDetailsCommand,
      IUpdateContactDetailsResponse
    >(new UpdateContactDetailsCommand(request));
  }

  async updatePersonalDetails(
    request: IUpdatePersonalDetailsRequest
  ): Promise<IUpdatePersonalDetailsResponse> {
    return await this.commandBus.execute<
      UpdatePersonalDetailsCommand,
      IUpdatePersonalDetailsResponse
    >(new UpdatePersonalDetailsCommand(request));
  }

  async updateOccupationDetails(
    request: IUpdateOccupationDetailsRequest
  ): Promise<IUpdateOccupationDetailsResponse> {
    return await this.commandBus.execute<
      UpdateOccupationDetailsCommand,
      IUpdateOccupationDetailsResponse
    >(new UpdateOccupationDetailsCommand(request));
  }
}
