import { Injectable, signal } from '@angular/core';
import { FileChartColumn, Users } from 'lucide-angular';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _loading = signal(false);
  private _sidebarExpanded = signal(false);
  private _userDropdownOpen = signal(false);
  public appStatus = signal<'online' | 'offline'>('online');
  public loading = this._loading.asReadonly();
  public sidebarExpanded = this._sidebarExpanded.asReadonly();
  public userDropdownOpen = this._userDropdownOpen.asReadonly();

  menu = [
    {
      label: 'Users',
      path: '/users',
      icon: Users,
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: FileChartColumn,
    },
  ];

  toggleLoader(state?: boolean) {
    if (state !== undefined) {
      this._loading.set(state);
      return;
    }
    this._loading.set(!this._loading());
  }

  toggleSidebar(state?: boolean) {
    if (state !== undefined) {
      this._sidebarExpanded.set(state);
      return;
    }
    this._sidebarExpanded.set(!this._sidebarExpanded());
  }

  toggleUserDropdown(state?: boolean) {
    if (state !== undefined) {
      this._userDropdownOpen.set(state);
      return;
    }
    this._userDropdownOpen.set(!this._userDropdownOpen());
  }
}
