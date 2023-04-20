import {
  ILikePostRequest, ILikePostResponse, LikePostCommand,
  CommentOnPostCommand, ICommentOnPostRequest, ICommentOnPostResponse,
  IBuyPostResponse, IBuyPostRequest, BuyPostCommand,
  ICreatePostRequest,ICreatePostResponse,CreatePostCommand
} from '@mp/api/postss/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class PostService {
  constructor(private readonly commandBus: CommandBus) {}

  async likePost(request: ILikePostRequest): Promise<ILikePostResponse> {
    return await this.commandBus.execute<LikePostCommand, ILikePostResponse>(new LikePostCommand(request));
  }
}

@Injectable()
  export class CommentService {
  constructor(private readonly commandBus: CommandBus) {}

  async commentOnPost(request: ICommentOnPostRequest): Promise<ICommentOnPostResponse> {
    return await this.commandBus.execute<CommentOnPostCommand, ICommentOnPostResponse>(new CommentOnPostCommand(request));
  }
}

@Injectable()
export class BuyService {
constructor(private readonly commandBus: CommandBus) {}

async buyPost(request: IBuyPostRequest): Promise<IBuyPostResponse> {
return await this.commandBus.execute<BuyPostCommand, IBuyPostResponse>(new BuyPostCommand(request));
}
}

@Injectable()
export class CreateService {
constructor(private readonly commandBus: CommandBus) {}
async createPost(request: ICreatePostRequest): Promise<ICreatePostResponse> {
return await this.commandBus.execute<CreatePostCommand, ICreatePostResponse>(new CreatePostCommand(request));
}
}

@Injectable()
export class LikeService {
constructor(private readonly commandBus: CommandBus) {}

async likePost(request: ILikePostRequest): Promise<ILikePostResponse> {
return await this.commandBus.execute<LikePostCommand, ILikePostResponse>(new LikePostCommand(request));
}
}
