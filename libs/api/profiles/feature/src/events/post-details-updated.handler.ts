import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { PostDetailsUpdatedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PostDetailsUpdatedEvent)
export class PostDetailsUpdatedHandler
  implements IEventHandler<PostDetailsUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: PostDetailsUpdatedEvent) {
    console.log(`${PostDetailsUpdatedHandler.name}`);
    await this.repository.updateProfile(event.profile);
  }
}
