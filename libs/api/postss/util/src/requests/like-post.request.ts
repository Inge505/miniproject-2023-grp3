import { IPost } from '../interfaces/post.interface';
import { IUser } from '../interfaces/user.interface';

export interface ILikePostRequest {
  post: IPost;
  user: IUser;
}
