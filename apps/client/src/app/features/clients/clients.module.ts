import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsIndexPage } from './pages/index';
import { FilterList } from '../../core/components/filter-list/filter-list';
import { ArrowLeft, LucideAngularModule, Plus, X } from 'lucide-angular';
import { DialogModule } from '@angular/cdk/dialog';
import { CreateClientModal } from './components/createClientModal/createClientModal';
import { ModalContainer } from '../../core/components/modal-container';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ClientsDetailsPage } from './pages/details/details';

@NgModule({
  declarations: [ClientsIndexPage, CreateClientModal, ClientsDetailsPage],
  imports: [
    ClientsRoutingModule,
    CommonModule,
    DialogModule,
    FilterList,
    ReactiveFormsModule,
    LucideAngularModule.pick({ Plus, X, ArrowLeft }),
    ModalContainer,
    NgxSonnerToaster,
  ],
  exports: [],
})
export class ClientsModule {}
