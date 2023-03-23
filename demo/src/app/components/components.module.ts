import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LapsePostComponent } from './lapse-post/lapse-post.component';
import { LapseTabsComponent } from './lapse-tabs/lapse-tabs.component';
@NgModule({
  declarations: [LapsePostComponent, LapseTabsComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [LapsePostComponent, LapseTabsComponent]
})
export class ComponentsModule { }
