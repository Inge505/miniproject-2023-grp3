import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ErrorsState } from './errors.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ErrorsState])],
})
export class ErrorsModule {}
