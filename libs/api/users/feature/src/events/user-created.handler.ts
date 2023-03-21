import { UsersRepository } from '@mp/api/users/data-access';
import { UserCreatedEvent } from '@mp/api/users/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly repository: UsersRepository) {}

  async handle(event: UserCreatedEvent) {
    console.log(`${UserCreatedHandler.name}`);
    await this.repository.createUser(event.user);
  }
}
