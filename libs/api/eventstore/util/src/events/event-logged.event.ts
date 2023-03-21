import { IEventstore } from '../interfaces';

export class EventLoggedEvent {
  constructor(public readonly eventstore: IEventstore) {}
}
