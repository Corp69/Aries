import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadComponent: () => import('./auth/login.component'),
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./auth/login/login.component'),
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }

];
