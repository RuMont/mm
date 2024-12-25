import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsIndexPage } from './pages/clientsIndex';
import { FilterList } from '../../core/components/filter-list/filter-list';
import { LucideAngularModule, Plus } from 'lucide-angular';

@NgModule({
  declarations: [ClientsIndexPage],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FilterList,
    LucideAngularModule.pick({ Plus }),
  ],
})
export class ClientsModule {}
