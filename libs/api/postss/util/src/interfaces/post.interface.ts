import { Timestamp } from 'firebase-admin/firestore';
import { Hashtag } from '../enums';
import { IComment } from './comment.interface';
import {IForSale} from "./for-sale.interface";

export interface IPost {
  postID: string;
  created?: Timestamp | null | undefined;
  content?: string | null | undefined;
  hashtag?: Hashtag | null |undefined;
  caption? : string | null | undefined;
  totalLikes?: number; //fixed like left out
  likedBy?: string[] | null | undefined;
  comments?: IComment[] | null;
  ownerValue?: number | null | undefined;
  ownedBy: string | null | undefined;
  createdBy: string;
  salePrice? : number | null | undefined;
  forSale?: IForSale | null | undefined;
}
