import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CopyrightModule } from '@mp/app/copyright/ui';
import { PrivacyPage } from './privacy.page';
import { PrivacyRouting } from './privacy.routing';

@NgModule({
  imports: [CommonModule, IonicModule, PrivacyRouting, CopyrightModule],
  declarations: [PrivacyPage],
})
export class PrivacyModule {}
