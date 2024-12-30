import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ClientsService } from '../../services/ClientsService';
import { ClientDto } from '@mmschemas/client.schema';
import { Columns } from '../../../../core/components/filter-list/types';
import { Dialog } from '@angular/cdk/dialog';
import { CreateClientModal } from '../../components/create-client-modal/create-client-modal';
import { filter, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { GenericFilter } from '@mmtypes/GenericFilter';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './index.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsIndexPage {
  private clientsService = inject(ClientsService);
  private dialog = inject(Dialog);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  filter = signal<GenericFilter<ClientDto>>({
    itemsPerPage: 10,
    page: 1,
    searchTerm: '',
    // fields: ['name', 'email'],
  });

  source$ = toObservable(this.filter).pipe(switchMap((filter) => this.clientsService.searchClients(filter)));

  constructor() {
    this.changeFilter(this.filter());
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

  openCreateClientModal() {
    this.dialog
      .open(CreateClientModal)
      .closed.pipe(filter(Boolean))
      .subscribe(() => this.changeFilter(this.filter()));
  }

  changeFilter(filter: GenericFilter<ClientDto>) {
    this.filter.set({ ...filter });
  }

  goToClientDetails(client: ClientDto) {
    console.log(`details/${client.id}`);
    this.router.navigate(['details', client.id], {
      state: {
        client
      },
      relativeTo: this.route
    })
  }
}
