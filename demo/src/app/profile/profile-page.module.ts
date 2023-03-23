import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePagePageRoutingModule } from './profile-page-routing.module';

import { ProfilePagePage } from './profile-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePagePageRoutingModule
  ],
  declarations: [ProfilePagePage]
})
export class ProfilePagePageModule {}
