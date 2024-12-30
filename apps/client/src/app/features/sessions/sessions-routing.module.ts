import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionsIndexPage } from './pages/index';

const routes: Routes = [{
  path: '',
  component: SessionsIndexPage
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule { }
