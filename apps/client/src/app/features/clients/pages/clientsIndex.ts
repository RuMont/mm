import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientsService } from '../services/ClientsService';
import { tap } from 'rxjs/internal/operators/tap';
import { ClientDto } from '@mmschemas/client.schema';
import { Columns } from '../../../core/components/filter-list/types';

@Component({
  templateUrl: './clientsIndex.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsIndexPage {
  private clientsService = inject(ClientsService);

  source$ = this.clientsService
    .searchClients({
      itemsPerPage: 10,
      page: 1,
    })
    .pipe(tap((res) => console.log(res)));

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
}
