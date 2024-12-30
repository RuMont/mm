import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsIndexPage } from './pages/index';
import { ClientsDetailsPage } from './pages/details/details';

const routes: Routes = [
  {
    path: '',
    component: ClientsIndexPage,
  },
  {
    path: 'details/:clientId',
    component: ClientsDetailsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
