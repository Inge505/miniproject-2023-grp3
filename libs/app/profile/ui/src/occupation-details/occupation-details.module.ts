import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from '@mp/app/profile/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OccupationDetailsComponent } from './occupation-details.component';

@NgModule({
  declarations: [OccupationDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgxSkeletonLoaderModule,
    NgxsFormPluginModule,
    ReactiveFormsModule,
    ProfileModule,
  ],
  exports: [OccupationDetailsComponent],
})
export class OccupationDetailsModule {}
