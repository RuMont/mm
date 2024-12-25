import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './clientsIndex.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsIndexPage {}
