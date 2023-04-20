import {
ICreatePostRequest,
IComment,
IUser
ICreatePostResponse,
IGetPostRequest,
IGetPostResponse,
IGetTrendoingPostRequest,
ILikePostRequest,
ILikePostResponse,
IPost,
IPosts,
CreatePostCommand,
PostGetEvent,
PostTrendingGetQuery,
PostCreatedEvent,
PostLikedEvent,
Hashtag,
} from '@mp/api/postss/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class Post extends AggregateRoot implements IPost {
constructor(
  public postID: string,
  public createdBy: string,
  public ownedBy: string | null | undefined,
  public likes: number,//fixed like left out
  public comments?: IComment[] | null,
  public createdAt?: Timestamp | null | undefined,
  public content?: string | null | undefined,
  public hashtag?: Hashtag | null |undefined,
  public caption? : string | null | undefined,
  public totalTime? : number | null | undefined,
  public ownerGainedTime?: number | null | undefined,
  public listing? : number | null | undefined
) {
  super();
}

static fromData(post: IPost): Post {
  const instance = new Post(
    post.postID,
    post.createdBy,
    post.ownedBy,
    post.likes,
    post.comments,
    post.createdAt,
    post.content,
    post.hashtag,
    post.caption,
    post.totalTime,
    post.ownerGainedTime,
    post.listing
  );
  return instance;
}

create() {
  this.apply(new PostCreatedEvent(this.toJSON()));
}

like(liker: IUser) {
  this.apply(new PostLikedEvent(this.toJSON(),liker))
}

toJSON(): IPost {
  return {
    postID : this.postID,
    createdBy : this.createdBy,
    ownedBy : this.ownedBy,
    likes : this.likes,
    comments : this.comments,
    createdAt : this.createdAt,
    content : this.content,
    hashtag : this.hashtag,
    caption : this.caption,
    totalTime : this.totalTime,
    ownerGainedTime : this.ownerGainedTime,
    listing : this.listing
  };
}
}
