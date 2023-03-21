import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { RegisterState } from './register.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([RegisterState])],
})
export class RegisterModule {}
