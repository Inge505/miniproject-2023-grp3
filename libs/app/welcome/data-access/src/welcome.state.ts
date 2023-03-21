import { Injectable } from '@angular/core';
import { ContinueWithGoogle as AuthContinueWithGoogle } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { ContinueWithGoogle } from '@mp/app/welcome/util';
import { Action, State, StateContext } from '@ngxs/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WelcomeStateModel {}

@State<WelcomeStateModel>({
  name: 'welcome',
})
@Injectable()
export class WelcomeState {
  @Action(ContinueWithGoogle)
  async continueWithGoogle(ctx: StateContext<WelcomeStateModel>) {
    try {
      return ctx.dispatch(new AuthContinueWithGoogle());
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
