import { ILogEventRequest, LogEventCommand } from '@mp/api/eventstore/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class EventstoreService {
  constructor(private commandBus: CommandBus) {}

  logEvent(request: ILogEventRequest) {
    return this.commandBus.execute(new LogEventCommand(request));
  }
}
