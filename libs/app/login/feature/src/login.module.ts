import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CopyrightModule } from '@mp/app/copyright/ui';
import { LoginModule as LoginDataAccessModule } from '@mp/app/login/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { LoginPage } from './login.page';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginDataAccessModule,
    NgxsFormPluginModule,
    LoginRouting,
    CopyrightModule,
  ],
  declarations: [LoginPage],
})
export class LoginModule {}
