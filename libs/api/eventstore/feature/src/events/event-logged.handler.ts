import { EventstoreRepository } from '@mp/api/eventstore/data-access';
import { EventLoggedEvent } from '@mp/api/eventstore/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(EventLoggedEvent)
export class EventLoggedHandler implements IEventHandler<EventLoggedEvent> {
  constructor(private readonly repository: EventstoreRepository) {}

  async handle(event: EventLoggedEvent) {
    console.log(`${EventLoggedHandler.name}`);

    // Get payload
    const eventstore = event.eventstore;
    await this.repository.logEvent(eventstore);
  }
}
