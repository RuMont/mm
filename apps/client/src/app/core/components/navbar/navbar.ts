import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogOut, LucideAngularModule, Menu, Settings, User } from 'lucide-angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { Router, RouterLink } from '@angular/router';
import { UiService } from '../../services/UiService';
import { AuthService } from '../../services/AuthService';
import { delay } from 'rxjs';

@Component({
  selector: 'mm-navbar',
  imports: [LucideAngularModule, OverlayModule, A11yModule, RouterLink],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected uiService = inject(UiService);
  private authService = inject(AuthService);
  private router = inject(Router);
  protected Menu = Menu;
  protected User = User;
  protected LogOut = LogOut;
  protected Settings = Settings;

  logout() {
    this.uiService.toggleLoader(true);
    this.authService
      .logout()
      .pipe(delay(200))
      .subscribe((res) => {
        this.router.navigateByUrl('');
        this.uiService.toggleUserDropdown(false);
      });
  }
}
