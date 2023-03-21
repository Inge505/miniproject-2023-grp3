import { Module } from '@nestjs/common';
import { EventstoreRepository } from './eventstore.repository';

@Module({
  providers: [EventstoreRepository],
  exports: [EventstoreRepository],
})
export class EventstoreModule {}
