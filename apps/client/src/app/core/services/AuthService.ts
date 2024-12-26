import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type AuthCredentials } from '@mmtypes/AuthCredentials';
import { GenericResponse } from '@mmtypes/server/APIResponses';
import { environment } from 'apps/client/src/environments/environment.prod';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: AuthCredentials) {
    return this.http
      .post<GenericResponse<{ token: string }>>(
        `${environment.apiUrl}/auth/login`,
        credentials
      )
      .pipe(
        tap((res) => {
          if ('token' in res) {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  checkTokenValidity() {
    return this.http.get<{ valid: boolean }>(
      `${environment.apiUrl}/auth/checktokenvalidity`
    );
  }

  logout() {
    return this.http
      .get<GenericResponse>(`${environment.apiUrl}/auth/logout`)
      .pipe(tap(() => localStorage.removeItem('token')));
  }
}
