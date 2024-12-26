import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UiService } from '../services/UiService';

@Component({
  selector: 'mm-loader',
  template: `
    @if (uiService.loading()) {
    <div class="min-w-[35vw] bg-emerald-400 fixed h-1 shadow shadow-primary-light animate-loading"></div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
  protected uiService = inject(UiService);
}
