import { Routes } from '@angular/router';

export const routes: Routes = [
    
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'change-detection',
        title: 'Change Detection',
        loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component'),
      }, 
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }





];
