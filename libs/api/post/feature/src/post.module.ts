import { PostModule as PostDataAccessModule } from '@mp/api/postss/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreatePostHandler,
} from './commands';
import {
  PostCreatedHandler,
} from './events';
import { PostSagas } from './post.sagas';
import { PostService } from './post.service';
export const CommandHandlers = [
  CreatePostHandler,
];
export const EventHandlers = [
  PostCreatedHandler,
];

@Module({
  imports: [CqrsModule, PostDataAccessModule],
  providers: [
    PostService,
    ...CommandHandlers,
    ...EventHandlers,
    PostSagas,
  ],
  exports: [PostService],
})
export class PostModule {}
