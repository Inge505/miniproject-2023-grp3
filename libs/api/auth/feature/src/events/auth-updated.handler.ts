import { AuthRepository } from '@mp/api/auth/data-access';
import { AuthUpdatedEvent } from '@mp/api/auth/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuthUpdatedEvent)
export class AuthUpdatedHandler implements IEventHandler<AuthUpdatedEvent> {
  constructor(private readonly repository: AuthRepository) {}

  async handle(event: AuthUpdatedEvent) {
    console.log(`${AuthUpdatedHandler.name}`);
    await this.repository.updateProfile(event.auth);
    delete event.auth.password;
  }
}
