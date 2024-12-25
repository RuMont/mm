import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from '../components/loader';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ToastOptions } from '../ToastOptions';

@Component({
  imports: [RouterOutlet, Loader, NgxSonnerToaster],
  template: `
    <mm-loader />
    <ngx-sonner-toaster position="top-right" [toastOptions]="ToastOptions" />
    <main class="min-h-[100dvh] grid place-items-center bg-primary">
      <div class="w-full max-w-md">
        <router-outlet />
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayout {
  protected ToastOptions = ToastOptions;
}
