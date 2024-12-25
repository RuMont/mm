import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Loader } from '../components/loader';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { UiService } from '../services/UiService';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ToastOptions } from '../ToastOptions';

@Component({
  imports: [RouterOutlet, Loader, Navbar, Sidebar, NgxSonnerToaster],
  template: `
    <mm-loader />
    <ngx-sonner-toaster position="top-right" [toastOptions]="ToastOptions" />
    <div class="grid grid-cols-1 md:grid-cols-[auto,1fr] h-[100dvh] text-black">
      <mm-sidebar
        (mouseenter)="uiService.toggleSidebar(true)"
        [class]="
          'transition-all overflow-hidden absolute bg-primary text-white top-0 left-0 z-10 h-screen md:z-0 md:static ' +
          (uiService.sidebarExpanded() ? 'w-screen md:w-64' : 'w-0 md:w-16 p-0')
        "
      />
      <div class="grid grid-rows-[auto,1fr] h-screen">
        <mm-navbar class="w-full bg-white border-b border-b-slate-200 flex items-center" />
        <main (mouseenter)="uiService.toggleSidebar(false)" class="bg-slate-100 text-slate-700 py-4 px-2 md:px-8 lg:px-24 lg:py-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {},
})
export class AppLayout {
  protected uiService = inject(UiService);
  protected ToastOptions = ToastOptions;
}
