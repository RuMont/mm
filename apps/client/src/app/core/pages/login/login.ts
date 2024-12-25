import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { getFieldErrors, isFieldInvalid } from '../../utils/FormUtils';
import { UiService } from '../../services/UiService';
import { AuthService } from '../../services/AuthService';
import { catchError, delay, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { toast } from 'ngx-sonner';
import { LoadingSpinner } from '../../components/loading-spinner';

@Component({
  imports: [RouterModule, ReactiveFormsModule, LoadingSpinner],
  selector: 'mm-root',
  templateUrl: 'login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  private fb = inject(FormBuilder);
  private uiService = inject(UiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  submitted = false;

  protected serverMsg = signal('');
  protected checkingToken = signal(true);

  protected readonly form = this.fb.group({
    username: this.fb.nonNullable.control('', [Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  isFieldInvalid = isFieldInvalid;
  getFieldErrors = getFieldErrors;

  ngOnInit(): void {
      this.checkUserIsLoggedIn();
  }

  protected checkUserIsLoggedIn() {
    this.authService.checkTokenValidity().pipe(
      delay(500)
    ).subscribe((res) => {
      this.checkingToken.set(false);
      console.log(res);
      if (!res.valid) {
        localStorage.removeItem('token');
        return;
      }
      this.router.navigateByUrl('/dashboard');
    });
  }

  protected submit() {
    this.submitted = true;
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.uiService.toggleLoader(true);

    this.authService
      .login(this.form.getRawValue())
      .pipe(
        take(1),
        delay(200),
        catchError((res: HttpErrorResponse) => {
          toast.error(res.error.message);
          this.uiService.toggleLoader(false);
          return EMPTY;
        })
      )
      .subscribe(() => this.router.navigateByUrl('/dashboard'));
  }
}
