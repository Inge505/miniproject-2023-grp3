import { PostRepository } from '@mp/api/postss/data-access';
import { PostLikedEvent } from '@mp/api/postss/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PostLikedEvent)
export class PostLikedEventHandler
  implements IEventHandler<PostLikedEvent>
{
  constructor(private readonly repository: PostRepository) {}

  async handle(event: PostLikedEvent) {
    console.log(`${PostLikedEventHandler.name}`);
    await this.repository.updateLikes(event.post,event.user);
  }
}
