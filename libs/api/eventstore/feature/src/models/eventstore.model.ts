import { EventLoggedEvent, IEventstore } from '@mp/api/eventstore/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Serializable } from 'child_process';
import { Timestamp } from 'firebase-admin/firestore';

export class Eventstore extends AggregateRoot implements IEventstore {
  constructor(
    public id: string,
    public type: string,
    public data?: Serializable | null,
    public timestamp?: Timestamp | null
  ) {
    super();
  }

  static fromData(eventstore: IEventstore): Eventstore {
    const instance = new Eventstore(
      eventstore.id,
      eventstore.type,
      eventstore.data,
      eventstore.timestamp
    );
    return instance;
  }

  logEvent() {
    this.apply(new EventLoggedEvent(this.toJSON()));
  }

  toJSON(): IEventstore {
    return {
      id: this.id,
      type: this.type,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}
