import { ILogEventRequest } from '../requests';

export class LogEventCommand {
  constructor(public readonly request: ILogEventRequest) {}
}
