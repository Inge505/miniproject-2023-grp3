import { Module } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Module({
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class AuthModule {}
