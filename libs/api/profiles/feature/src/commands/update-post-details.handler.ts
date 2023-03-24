import { ProfilesRepository } from '@mp/api/profiles/data-access';
import {
    IUpdatePostDetailsResponse,
    UpdatePostDetailsCommand
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Profile } from '../models';

@CommandHandler(UpdatePostDetailsCommand)
export class UpdatePostDetailsHandler
  implements
    ICommandHandler<UpdatePostDetailsCommand, IUpdatePostDetailsResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ProfilesRepository
  ) {}

  async execute(command: UpdatePostDetailsCommand) {
    console.debug(`${UpdatePostDetailsHandler.name}`+ "in commands excute");

    const request = command.request;
    const profileDoc = await this.repository.findOne(request.profile);
    const profileData = profileDoc.data();

    if (!profileData) throw new Error('Profile not found');

    const profile = this.publisher.mergeObjectContext(
      Profile.fromData(profileData)
    );

    if (!request.profile.postDetails)
      throw new Error('Profile post details not found');
    profile.updatePostDetails(request.profile.postDetails);
    profile.commit();

    const response: IUpdatePostDetailsResponse = { profile };
    return response;
  }
}
