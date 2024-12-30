import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ClientsService } from '../services/ClientsService';
import { ClientDto } from '@mmschemas/client.schema';
import { Columns } from '../../../core/components/filter-list/types';
import { Dialog } from '@angular/cdk/dialog';
import { ClientModal } from '../components/clientModal/clientModal';
import { filter, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { GenericFilter } from '@mmtypes/GenericFilter';

@Component({
  templateUrl: './index.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsIndexPage {
  private clientsService = inject(ClientsService);
  private dialog = inject(Dialog);

  filter = signal<GenericFilter<ClientDto>>({
    itemsPerPage: 10,
    page: 1,
    searchTerm: '',
    // fields: ['name', 'email'],
  });

  source$ = toObservable(this.filter).pipe(switchMap((filter) => this.clientsService.searchClients(filter)));

  constructor() {
    this.changeFilter(this.filter())
  }

  columns: Columns<ClientDto> = [
    {
      key: 'name',
      label: 'Nombre',
    },
    {
      key: 'email',
      label: 'Email',
    },
  ];

  openClientModal(client?: ClientDto) {
    console.log(client);
    this.dialog
      .open(ClientModal, {
        data: client,
      })
      .closed.pipe(filter(Boolean))
      .subscribe(() => this.changeFilter(this.filter()));
  }

  changeFilter(filter: GenericFilter<ClientDto>) {
    this.filter.set({...filter});
  }
}
