import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientsService } from '../services/ClientsService';

@Component({
  templateUrl: './clientsIndex.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsIndexPage {
  private clientsService = inject(ClientsService);

  source = this.clientsService.searchClients

}
