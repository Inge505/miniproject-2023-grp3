import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './profile.state';
import { ProfilesApi } from './profiles.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ProfileState]), AuthModule],
  providers: [ProfilesApi],
})
export class ProfileModule {}
