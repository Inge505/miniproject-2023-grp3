import { IComment } from '../interfaces/comment.interface';

export interface ICommentOnPostRequest {
  userId?: string|null, // the user id of the person on whose picture will be commented on
  comment: IComment;
}