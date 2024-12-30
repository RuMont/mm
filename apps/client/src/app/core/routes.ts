import { Route } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { LoginLayout } from './layouts/login-layout';
import { AppLayout } from './layouts/app-layout';
import { isUserLoggedGuard } from './guards/is-user-logged.guard';

export const routes: Route[] = [
  {
    path: '',
    component: LoginLayout,
    children: [
      {
        path: '',
        component: LoginPage,
      },
    ],
  },
  {
    path: '',
    component: AppLayout,
    canMatch: [isUserLoggedGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard').then(({ DashboardPage }) => DashboardPage),
      },
      {
        path: 'clients',
        loadChildren: () => import('../features/clients/clients.module').then(({ ClientsModule }) => ClientsModule),
      },
      {
        path: 'sessions',
        loadChildren: () => import('../features/sessions/sessions.module').then(({ SessionsModule }) => SessionsModule),
      },
    ],
  },
];
