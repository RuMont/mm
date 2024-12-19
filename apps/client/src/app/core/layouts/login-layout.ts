import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from '../components/loader';

@Component({
  imports: [RouterOutlet, Loader],
  template: `
    <mm-loader />
    <main class="min-h-[100dvh] grid place-items-center bg-primary">
      <div class="w-full max-w-md">
        <router-outlet />
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayout {}
