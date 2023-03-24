import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePagePage } from './profile-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePagePageRoutingModule {}
