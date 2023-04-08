import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LapsePostModule } from './lapse-post';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LapsePostModule,

  ],
  exports: [
    LapsePostModule,
  ],
})
export class DashboardModule {}
