import { AuthCreatedEvent } from '@mp/api/auth/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuthCreatedEvent)
export class AuthCreatedHandler implements IEventHandler<AuthCreatedEvent> {
  async handle(event: AuthCreatedEvent) {
    console.log(`${AuthCreatedHandler.name}`);
  }
}
