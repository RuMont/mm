import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainer } from '../modal-container';
import { LucideAngularModule, X } from 'lucide-angular';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  imports: [CommonModule, ModalContainer, LucideAngularModule],
  templateUrl: './confirm-danger-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDangerModal {
  protected readonly data: {
    message: string;
  } = inject(DIALOG_DATA);
  protected dialogRef = inject(DialogRef);
  protected readonly X = X;
}
