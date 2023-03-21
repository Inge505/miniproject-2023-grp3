import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from '@mp/app/profile/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContactDetailsComponent } from './contact-details.component';

@NgModule({
  declarations: [ContactDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgxSkeletonLoaderModule,
    NgxsFormPluginModule,
    ReactiveFormsModule,
    ProfileModule,
  ],
  exports: [ContactDetailsComponent],
})
export class ContactDetailsModule {}
