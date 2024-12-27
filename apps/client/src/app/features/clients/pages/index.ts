import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientsService } from '../services/ClientsService';
import { ClientDto } from '@mmschemas/client.schema';
import { Columns } from '../../../core/components/filter-list/types';
import { Dialog } from '@angular/cdk/dialog';
import { ClientModal } from '../components/clientModal/clientModal';
import { filter, ReplaySubject, switchMap } from 'rxjs';

@Component({
  templateUrl: './index.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsIndexPage {
  private clientsService = inject(ClientsService);
  private dialog = inject(Dialog);

  private httpTrigger = new ReplaySubject<void>();

  source$ = this.httpTrigger.pipe(
    switchMap(() =>
      this.clientsService.searchClients({
        itemsPerPage: 10,
        page: 1,
      }),
    ),
  );

  constructor() {
    this.httpTrigger.next();
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
      .subscribe(() => this.httpTrigger.next());
  }
}
