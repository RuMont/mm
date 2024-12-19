import { Route } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { LoginLayout } from './layouts/login-layout';
import { AppLayout } from './layouts/app-layout';

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
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard').then((c) => c.DashboardPage),
      },
      // {
      //   path: 'users',
      //   loadChildren: () => import('../features/users/users.module').then((m) => m.UsersModule),
      // },
    ],
  },
];
