import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DashboardModule as DashboardUiModule } from '@mp/app/dashboard/ui';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DashboardPage } from './dashboard.page';
import { DashboardRouting } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardRouting,
    DashboardUiModule,
    NgxSkeletonLoaderModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardModule {}
