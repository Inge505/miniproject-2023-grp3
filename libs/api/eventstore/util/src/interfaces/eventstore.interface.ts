import { Serializable } from 'child_process';
import { Timestamp } from 'firebase-admin/firestore';

export interface IEventstore {
  id: string;
  type: string;
  data?: Serializable | null;
  timestamp?: Timestamp | null;
}
