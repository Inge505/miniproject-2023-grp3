import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorsModule as ErrorsDataAccessModule } from '@mp/app/errors/data-access';

@NgModule({
  imports: [CommonModule, ErrorsDataAccessModule],
})
export class ErrorsModule {}
