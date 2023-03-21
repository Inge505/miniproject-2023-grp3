import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProfileStatusComponent } from './profile-status.component';

@NgModule({
  declarations: [ProfileStatusComponent],
  imports: [CommonModule, IonicModule, RouterModule, NgxSkeletonLoaderModule],
  exports: [ProfileStatusComponent],
})
export class ProfileStatusModule {}
