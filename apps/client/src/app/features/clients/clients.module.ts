import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsIndexPage } from './pages/index';
import { FilterList } from '../../core/components/filter-list/filter-list';
import { LucideAngularModule, Plus, X } from 'lucide-angular';
import { DialogModule } from '@angular/cdk/dialog';
import { ClientModal } from './components/clientModal/clientModal';
import { ModalContainer } from '../../core/components/modal-container';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSonnerToaster } from 'ngx-sonner';

@NgModule({
  declarations: [ClientsIndexPage, ClientModal],
  imports: [
    ClientsRoutingModule,
    CommonModule,
    DialogModule,
    FilterList,
    ReactiveFormsModule,
    LucideAngularModule.pick({ Plus, X }),
    ModalContainer,
    NgxSonnerToaster
  ],
})
export class ClientsModule {}
