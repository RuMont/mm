import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../../services/ClientsService';
import { toast } from 'ngx-sonner';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDto } from '@mmschemas/client.schema';
import { catchError, EMPTY, filter, switchMap, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDangerModal } from 'apps/client/src/app/core/components/confirm-danger-modal/confirm-danger-modal';

@Component({
  standalone: false,
  templateUrl: './details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsDetailsPage {
  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private clientsService = inject(ClientsService);
  private router = inject(Router);
  private snapshot = inject(ActivatedRoute).snapshot;

  private client: ClientDto | null = null;

  protected readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    email: this.fb.control('', [Validators.email]),
    phone: this.fb.control('', [Validators.minLength(9)]),
    address: this.fb.control(''),
    active: this.fb.control(false),
    birthDate: this.fb.control(''),
  });

  constructor() {
    const client = this.router.getCurrentNavigation()?.extras.state?.['client'] as ClientDto;
    this.client = client;
    if (client) {
      this.patchForm(client);
      return;
    }
    const clientId = this.snapshot.paramMap.get('clientId');
    if (!clientId) return; // 404
    this.patchWithAsyncClient(+clientId);
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      toast.error('Hay campos en el formulario con errores');
      return;
    }
    const data = this.form.getRawValue();
    this.edit(data);
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
          this.patchForm(this.client!);
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if ('message' in res) toast.success(res.message);
      });
  }

  remove() {
    if (!this.client) return;
    this.dialog
      .open(ConfirmDangerModal, {
        data: {
          message: `¿Estás seguro de querer eliminar al cliente ${this.client.name}?`,
        },
      })
      .closed.pipe(
        filter(Boolean),
        switchMap(() =>
          this.clientsService.deleteClient(this.client!.id).pipe(
            take(1),
            catchError((err: HttpErrorResponse) => {
              toast.error(err.error);
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe((res) => {
        this.router.navigateByUrl('/clients');
        if ('message' in res) toast.success(res.message);
      });
  }

  private patchWithAsyncClient(clientId: number) {
    this.clientsService.getClientById(clientId).pipe(take(1)).subscribe(this.patchForm.bind(this));
  }

  private patchForm(client: ClientDto) {
    this.client = client;
    this.form.patchValue({
      ...client,
      active: !!client.active,
      birthDate: client.birthDate?.split(' ')[0],
    });
  }
}
