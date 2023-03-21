import {
    CreateProfileCommand,
    IProfile,
    ProfileStatus
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Profile } from '../models';

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateProfileCommand) {
    console.log(`${CreateProfileHandler.name}`);

    const request = command.request;
    const userId = request.user.id;
    const displayName = request.user.displayName;
    const email = request.user.email;
    const photoURL = request.user.photoURL;
    const cellphone = request.user.phoneNumber;

    const data: IProfile = {
      userId,
      accountDetails: {
        displayName,
        email,
        photoURL,
        status: ProfileStatus.INCOMPLETE,
      },
      personalDetails: {
        age: null,
        gender: null,
        ethnicity: null,
        status: ProfileStatus.INCOMPLETE,
      },
      contactDetails: {
        cellphone,
        status: ProfileStatus.INCOMPLETE,
      },
      addressDetails: {
        residentialArea: null,
        workArea: null,
        status: ProfileStatus.INCOMPLETE,
      },
      occupationDetails: {
        householdIncome: null,
        occupation: null,
        status: ProfileStatus.INCOMPLETE,
      },
      status: ProfileStatus.INCOMPLETE,
      created: Timestamp.fromDate(new Date()),
    };
    const profile = this.publisher.mergeObjectContext(Profile.fromData(data));

    profile.create();
    profile.commit();
  }
}
