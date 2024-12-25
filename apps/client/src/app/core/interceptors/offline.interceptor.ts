import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError } from 'rxjs';
import { UiService } from '../services/UiService';

export const offlineInterceptor: HttpInterceptorFn = (req, next) => {
  const uiService = inject(UiService);
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        uiService.appStatus.set('online');
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        uiService.appStatus.set('offline');
      }
      return throwError(() => error);
    })
  );
};
