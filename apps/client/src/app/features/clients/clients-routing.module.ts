import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsIndexPage } from './pages/index';

const routes: Routes = [
  {
    path: '',
    component: ClientsIndexPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
