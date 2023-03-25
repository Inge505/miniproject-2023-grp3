import { Timestamp } from 'firebase-admin/firestore';
import { Hashtag } from '../enums';
import {IComment} from './comment.interface';

export interface IPost {
  buyerID?: string| null;
  postID: string;
  createdBy: string;
  ownedBy: string | null | undefined;
  likes: number; //fixed like left out
  comments?: IComment[] | null;
  createdAt?: Timestamp | null | undefined;
  content?: string | null | undefined;
  hashtag?: Hashtag | null |undefined;
  caption? : string | null | undefined;
  totalTime? : number | null | undefined
  ownerGainedTime?: number | null | undefined;
  listing? : number | null | undefined;
  comments?:(string | Comment)[]
}
