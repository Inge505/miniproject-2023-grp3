import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TosPage } from './tos.page';

const routes: Routes = [
  {
    path: '',
    component: TosPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TosRouting {}
