import { EventstoreModule as EventstoreDataAccessModule } from '@mp/api/eventstore/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LogEventHandler } from './commands';
import { EventLoggedHandler } from './events';
import { EventstoreSagas } from './eventstore.sagas';
import { EventstoreService } from './eventstore.service';

export const CommandHandlers = [LogEventHandler];
export const EventHandlers = [EventLoggedHandler];

@Module({
  imports: [CqrsModule, EventstoreDataAccessModule],
  providers: [
    EventstoreService,
    ...CommandHandlers,
    ...EventHandlers,
    EventstoreSagas,
  ],
  exports: [EventstoreService],
})
export class EventstoreModule {}
