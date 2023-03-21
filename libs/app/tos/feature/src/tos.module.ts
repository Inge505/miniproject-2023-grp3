import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CopyrightModule } from '@mp/app/copyright/ui';
import { TosPage } from './tos.page';
import { TosRouting } from './tos.routing';

@NgModule({
  imports: [CommonModule, IonicModule, TosRouting, CopyrightModule],
  declarations: [TosPage],
})
export class TosModule {}
