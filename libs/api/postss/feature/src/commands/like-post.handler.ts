import { PostRepository } from '@mp/api/postss/data-access';
import {
    ILikePostResponse,
    LikePostCommand,
    IPost
} from '@mp/api/postss/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Post } from '../models';

@CommandHandler(LikePostCommand)
export class LikePostHandler
  implements
    ICommandHandler<LikePostCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: LikePostCommand) {
    console.log(`${LikePostCommand.name}`);

    const request = command.request;
    const returnedMessageAndPost = await this.repository.updateLikes(request.post,request.user);
    const successBool = returnedMessageAndPost.success
    const returnedPost = (await returnedMessageAndPost.returnedPost)?.data()

    if (!successBool) throw new Error("Error liking post");

    const postAfterLike = this.publisher.mergeObjectContext(
      Post.fromData(returnedPost!)
    );
    
    postAfterLike.like(request.user);
    postAfterLike.commit();

    // const response: ILikePostResponse["post"] = postAfterLike;
    // return response;
  }
}