import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { WelcomeState } from './welcome.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([WelcomeState])],
})
export class WelcomeModule {}
