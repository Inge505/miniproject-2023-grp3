import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SearchPageRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';

import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
