import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { getFieldErrors, isFieldInvalid } from '../../utils/FormUtils';
import { UiService } from '../../services/UiService';
import { AuthService } from '../../services/AuthService';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  imports: [RouterModule, ReactiveFormsModule, NgxSonnerToaster],
  selector: 'mm-root',
  templateUrl: 'login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private uiService = inject(UiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  submitted = false;

  protected serverMsg = signal('');

  protected readonly form = this.fb.group({
    username: this.fb.nonNullable.control('', [Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  isFieldInvalid = isFieldInvalid;
  getFieldErrors = getFieldErrors;

  protected submit() {
    this.submitted = true;
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.uiService.toggleLoader(true);

    this.authService
      .login(this.form.getRawValue())
      .pipe(take(1), catchError((res: HttpErrorResponse) => {
        toast.error(res.error.message);
        this.uiService.toggleLoader(false);
        return EMPTY;
      }))
      .subscribe(() => this.router.navigateByUrl('/dashboard'));
  }
}
