import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LapsePostComponent } from './lapse-post/lapse-post.component';

@NgModule({
  declarations: [LapsePostComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [LapsePostComponent]
})
export class ComponentsModule { }
