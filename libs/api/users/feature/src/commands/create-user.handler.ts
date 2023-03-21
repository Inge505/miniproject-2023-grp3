import { CreateUserCommand, IUser } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../models';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateUserCommand) {
    console.log(`${CreateUserHandler.name}`);

    const request = command.request;
    const data: IUser = {
      id: request.auth.id,
      email: request.auth.email,
      displayName: request.auth.displayName,
      photoURL: request.auth.photoURL,
      phoneNumber: request.auth.phoneNumber,
      customClaims: request.auth.customClaims,
      created: request.auth.created,
    };
    const user = this.publisher.mergeObjectContext(User.fromData(data));

    user.create();
    user.commit();
  }
}
