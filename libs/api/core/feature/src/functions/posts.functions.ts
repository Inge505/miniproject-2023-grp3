import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import {
  ILikePostRequest, ILikePostResponse, ICommentOnPostRequest, ICommentOnPostResponse, IBuyPostResponse, IBuyPostRequest, PostTrendingGetQuery,ICreatePostRequest,ICreatePostResponse,
 } from '@mp/api/postss/util';
import { QueryBus } from '@nestjs/cqrs';
import { IPost } from '@mp/api/postss/util';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PostService, CommentService, BuyService, CreateService, LikeService} from '@mp/api/postss/feature';

/*
Function that calls the postTrendingGetQuery and returns an array of IPost objects
*/
export const postTrendingGet = functions.https.onCall(
    async(): Promise<IPost[]> => {
        const apl = await NestFactory.createApplicationContext(CoreModule);
        const queryBus = apl.get(QueryBus);
        const postModule = await queryBus.execute(new PostTrendingGetQuery());
        return postModule.posts;
    }
)

/**
 * Function that
 */

export const likePost = functions.https.onCall(
    async (
      request: ILikePostRequest
    ): Promise<ILikePostResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(LikeService);
      return service.likePost(request);
    }
  );

  export const commentOnPost = functions.https.onCall(
    async (
      request: ICommentOnPostRequest
    ): Promise<ICommentOnPostResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(CommentService);
      return service.commentOnPost(request);
    }
  );

export const buyPost = functions.https.onCall(
    async (
      request: IBuyPostRequest
    ): Promise<IBuyPostResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(BuyService);
      return service.buyPost(request);
    }
  );

  export const createPost = functions.https.onCall(
    async (
      request: ICreatePostRequest
    ): Promise<ICreatePostResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(CreateService);
      return service.createPost(request);
    }
  );



