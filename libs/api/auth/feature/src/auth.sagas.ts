import { UpdateAuthCommand } from '@mp/api/auth/util';
import {
    AccountDetailsUpdatedEvent,
    ContactDetailsUpdatedEvent
} from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthSagas {
  @Saga()
  onAccountDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountDetailsUpdatedEvent),
      map(
        (event: AccountDetailsUpdatedEvent) =>
          new UpdateAuthCommand({
            auth: {
              id: event.profile.userId,
              displayName: event.profile.accountDetails?.displayName,
              email: event.profile.accountDetails?.email,
              photoURL: event.profile.accountDetails?.photoURL,
              password: event.profile.accountDetails?.password,
            },
          })
      )
    );
  };

  @Saga()
  onContactDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ContactDetailsUpdatedEvent),
      map(
        (event: ContactDetailsUpdatedEvent) =>
          new UpdateAuthCommand({
            auth: {
              id: event.profile.userId,
              phoneNumber: event.profile.contactDetails?.cellphone,
            },
          })
      )
    );
  };
}
