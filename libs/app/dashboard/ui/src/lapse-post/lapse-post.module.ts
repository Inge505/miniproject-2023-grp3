import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LapsePostComponent } from './lapse-post.component';

@NgModule({
  declarations: [LapsePostComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [LapsePostComponent],
})
export class LapsePostModule {}
