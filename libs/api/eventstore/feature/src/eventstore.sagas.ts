import { AuthUpdatedEvent } from '@mp/api/auth/util';
import { EventLoggedEvent, LogEventCommand } from '@mp/api/eventstore/util';
import { AccountDetailsUpdatedEvent } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { Serializable } from 'child_process';
import { filter, map, Observable } from 'rxjs';

const compileLogEventCommand = (event: IEvent) => {
  const data: { [key: string]: Serializable | undefined } = {};
  const dataLen = Object.keys(event).length;

  for (let i = 0; i < dataLen; i++) {
    const key = Object.keys(event)[i];
    const value = Object.values(event)[i];
    data[key] = value;
  }

  return new LogEventCommand({
    type: event.constructor.name,
    data,
  });
};
@Injectable()
export class EventstoreSagas {
  @Saga()
  onAccountDetailsUpdated = (
    events$: Observable<IEvent>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountDetailsUpdatedEvent),
      map((event: AccountDetailsUpdatedEvent) => {
        // Special case, delete password before hitting eventstore
        delete event.profile.accountDetails?.password;
        return compileLogEventCommand(event);
      })
    );
  };

  onAuthUpdated = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AuthUpdatedEvent),
      map((event: AuthUpdatedEvent) => {
        // Special case, delete password before hitting eventstore
        delete event.auth.password;
        return compileLogEventCommand(event);
      })
    );
  };

  @Saga()
  onAllEvents = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      filter((event) => !(event instanceof EventLoggedEvent)),
      map((event) => compileLogEventCommand(event))
    );
  };
}
