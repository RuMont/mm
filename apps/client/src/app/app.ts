import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventType, Router, RouterModule } from '@angular/router';
import { UiService } from './core/services/UiService';
import { filter } from 'rxjs';

@Component({
  imports: [RouterModule],
  selector: 'mm-root',
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private uiService = inject(UiService);
  private router = inject(Router);

  constructor() {
    // if you change to another route this will disable the loader once the route is loaded
    this.router.events
      .pipe(filter((event) => event.type === EventType.NavigationEnd))
      .subscribe(() => this.uiService.toggleLoader(false));
  }
}
