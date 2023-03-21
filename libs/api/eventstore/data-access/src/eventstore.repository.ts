import { IEventstore } from '@mp/api/eventstore/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class EventstoreRepository {
  async logEvent(eventstore: IEventstore) {
    return await admin
      .firestore()
      .collection('eventstore')
      .doc(eventstore.id)
      .create(eventstore);
  }
}
