import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { VersionComponent } from './version.component';

@NgModule({
  declarations: [VersionComponent],
  imports: [CommonModule, IonicModule],
  exports: [VersionComponent],
})
export class VersionModule {}
