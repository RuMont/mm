import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateClientDto } from '@mmschemas/client.schema';
import { ToastOptions } from 'apps/client/src/app/core/ToastOptions';
import { toast } from 'ngx-sonner';
import { ClientsService } from '../../services/ClientsService';
import { catchError, EMPTY, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: false,
  templateUrl: './clientModal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  private clientsService = inject(ClientsService);

  protected ToastOptions = ToastOptions;
  protected client: UpdateClientDto | undefined = inject(DIALOG_DATA);
  protected form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    email: this.fb.control('', [Validators.email]),
    phone: this.fb.control('', [Validators.minLength(9)]),
    address: this.fb.control(''),
    active: this.fb.control(false),
    birthDate: this.fb.control(''),
  });

  constructor() {
    if (this.client) {
      const parsedClient = {
        ...this.client,
        active: !!this.client.active,
        birthDate: this.client.birthDate?.split(' ')[0],
      };
      this.form.patchValue(parsedClient);
    }
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      toast.error('Hay campos en el formulario con errores');
      return;
    }
    const data = this.form.getRawValue();
    if (this.client) {
      this.edit(data);
      return;
    }
    this.create(data);
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

  edit(data: ReturnType<typeof this.form.getRawValue>) {
    if (!this.client) return;
    this.clientsService
      .updateClient(this.client.id, {
        ...data,
        id: this.client.id,
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

  remove() {
    if (!this.client) return;
    this.clientsService
      .deleteClient(this.client.id)
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
