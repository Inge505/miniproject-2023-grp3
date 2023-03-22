import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LapsePostComponent } from './lapse-post/lapse-post.component';

@NgModule({
  declarations: [LapsePostComponent],
  imports: [
    CommonModule
  ],
  exports: [LapsePostComponent]
})
export class ComponentsModule { }
