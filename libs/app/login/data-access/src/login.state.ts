import { Injectable } from '@angular/core';
import { Login as AuthLogin } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Login } from '@mp/app/login/util';
import { Action, State, StateContext } from '@ngxs/store';

export interface LoginStateModel {
  loginForm: {
    model: {
      email: string | null;
      password: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<LoginStateModel>({
  name: 'login',
  defaults: {
    loginForm: {
      model: {
        email: null,
        password: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class LoginState {
  @Action(Login)
  async login(ctx: StateContext<LoginStateModel>) {
    try {
      const state = ctx.getState();
      const email = state.loginForm.model.email;
      const password = state.loginForm.model.password;

      if (email && password) {
        return ctx.dispatch(new AuthLogin(email, password));
      }
      return ctx.dispatch(new SetError('Email and password not set'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
