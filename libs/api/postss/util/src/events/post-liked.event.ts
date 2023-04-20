import { IPost } from '../interfaces';
import {IUser} from '../interfaces';

export class PostLikedEvent {
  constructor(public readonly post: IPost, public readonly user: IUser) {}
}
