import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateClientDto } from '@mmschemas/client.schema';
import { ToastOptions } from 'apps/client/src/app/core/ToastOptions';
import { toast } from 'ngx-sonner';
import { ClientsService } from '../../services/ClientsService';
import { catchError, EMPTY, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: false,
  templateUrl: './createClientModal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClientModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  private clientsService = inject(ClientsService);

  protected ToastOptions = ToastOptions;
  protected form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    email: this.fb.control('', [Validators.email]),
    phone: this.fb.control('', [Validators.minLength(9)]),
    address: this.fb.control(''),
    active: this.fb.control(false),
    birthDate: this.fb.control(''),
  });

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      toast.error('Hay campos en el formulario con errores');
      return;
    }
    this.create(this.form.getRawValue());
  }

  create(data: ReturnType<typeof this.form.getRawValue>) {
    this.clientsService
      .createClient({
        ...data,
        active: Number(data.active),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => {
          toast.error(err.error);
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        this.dialogRef.close(res);
        if ('message' in res) toast.success(res.message);
      });
  }
}
