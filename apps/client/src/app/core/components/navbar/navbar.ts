import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogOut, LucideAngularModule, Menu, Settings, User } from 'lucide-angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { RouterLink } from '@angular/router';
import { UiService } from '../../services/UiService';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'mm-navbar',
  imports: [LucideAngularModule, OverlayModule, A11yModule, RouterLink],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected uiService = inject(UiService);
  private authService = inject(AuthService);
  protected Menu = Menu;
  protected User = User;
  protected LogOut = LogOut;
  protected Settings = Settings;

  logout() {
    this.uiService.toggleLoader(true);
    this.authService.logout();
  }
}
