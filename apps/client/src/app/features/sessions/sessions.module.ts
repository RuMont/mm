import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsIndexPage } from './pages/index';


@NgModule({
  declarations: [
    SessionsIndexPage
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule
  ]
})
export class SessionsModule { }
