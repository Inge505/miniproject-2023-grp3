import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { ProfileCreatedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProfileCreatedEvent)
export class ProfileCreatedHandler
  implements IEventHandler<ProfileCreatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfileCreatedEvent) {
    console.log(`${ProfileCreatedHandler.name}`);
    await this.repository.createProfile(event.profile);
  }
}
