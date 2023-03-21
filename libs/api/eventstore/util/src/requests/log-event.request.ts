import { Serializable } from 'child_process';

export interface ILogEventRequest {
  type: string;
  data?: Serializable | null;
}
