import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type AuthCredentials } from '@mmtypes/AuthCredentials';
import { type LoginResponse } from '@mmtypes/server/APIResponses';
import { environment } from 'apps/client/src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: AuthCredentials) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials);
  }

  logout() {

  }
}
