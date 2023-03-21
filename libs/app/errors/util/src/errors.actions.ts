export class SetError {
  static readonly type = '[Errors] SetError';
  constructor(public readonly error: string | null) {}
}
