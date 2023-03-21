import { AuthModule as AuthDataAccessModule } from '@mp/api/auth/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthSagas } from './auth.sagas';
import { AuthService } from './auth.service';
import { CreateAuthHandler, UpdateAuthHandler } from './commands';
import { AuthCreatedHandler, AuthUpdatedHandler } from './events';
export const CommandHandlers = [CreateAuthHandler, UpdateAuthHandler];
export const EventHandlers = [AuthCreatedHandler, AuthUpdatedHandler];

@Module({
  imports: [CqrsModule, AuthDataAccessModule],
  providers: [AuthService, ...CommandHandlers, ...EventHandlers, AuthSagas],
  exports: [AuthService],
})
export class AuthModule {}
