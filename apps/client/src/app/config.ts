import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './core/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { offlineInterceptor } from './core/interceptors/offline.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { forbiddenInterceptor } from './core/interceptors/forbidden.interceptor';

export const config: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        forbiddenInterceptor,
        offlineInterceptor,
      ])
    ),
  ],
};
