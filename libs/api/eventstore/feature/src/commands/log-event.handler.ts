import { IEventstore, LogEventCommand } from '@mp/api/eventstore/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import cuid from 'cuid';
import { Timestamp } from 'firebase-admin/firestore';
import { Eventstore } from '../models';

@CommandHandler(LogEventCommand)
export class LogEventHandler implements ICommandHandler<LogEventCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: LogEventCommand) {
    console.log(`${LogEventHandler.name}`);

    const request = command.request;
    const data: IEventstore = {
      id: cuid(),
      type: request.type,
      data: request.data,
      timestamp: Timestamp.fromDate(new Date()),
    };
    const eventstore = this.publisher.mergeObjectContext(
      Eventstore.fromData(data)
    );

    eventstore.logEvent();
    eventstore.commit();
  }
}
