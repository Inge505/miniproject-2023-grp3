import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccountDetailsModule } from './account-details';
import { AddressDetailsModule } from './address-details';
import { ContactDetailsModule } from './contact-details';
import { OccupationDetailsModule } from './occupation-details';
import { PersonalDetailsModule } from './personal-details';
import { PostDetailsModule } from './post-details';
import { ProfileStatusModule } from './profile-status';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountDetailsModule,
    AddressDetailsModule,
    ContactDetailsModule,
    OccupationDetailsModule,
    PersonalDetailsModule,
    PostDetailsModule,
    ProfileStatusModule,
  ],
  exports: [
    AccountDetailsModule,
    PostDetailsModule,
    AddressDetailsModule,
    ContactDetailsModule,
    OccupationDetailsModule,
    PersonalDetailsModule,
    ProfileStatusModule,
  ],
})
export class ProfileModule {}
