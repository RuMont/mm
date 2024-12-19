import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Home, LucideAngularModule, X } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { UiService } from '../../services/UiService';

@Component({
  selector: 'mm-sidebar',
  imports: [LucideAngularModule, RouterLink, LayoutModule],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected uiService = inject(UiService);
  private breakpointObserver = inject(BreakpointObserver);
  protected X = X;
  protected Home = Home;

  private under768 = false;

  constructor() {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((state) => {
      this.under768 = state.matches;
    });
  }

  closeIfSmallScreen() {
    if (this.under768) this.uiService.toggleSidebar(false);
  }
}
