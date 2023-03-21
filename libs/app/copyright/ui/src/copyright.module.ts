import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CopyrightComponent } from './copyright.component';

@NgModule({
  declarations: [CopyrightComponent],
  imports: [CommonModule, IonicModule],
  exports: [CopyrightComponent],
})
export class CopyrightModule {}
