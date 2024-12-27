import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mm-modal-container',
  template: ` <div
    class="w-[calc(100vw-1rem)] md:min-w-96 md:w-auto overflow-hidden mx-2 bg-white text-black border-slate-100 shadow rounded animate-fastFadeIn"
  >
    <ng-content />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainer {}
