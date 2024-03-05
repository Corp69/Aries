import { Routes } from '@angular/router';
import { AuthGuard } from './auth/login/guards/auth.guard';

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
        //path: '', redirectTo: 'login', pathMatch: 'full',
        path: '**',redirectTo: 'login'
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      {
        path:  'principal',
        title: 'principal',
        loadComponent: () => import('./dashboard/pages/principal/principal.component'),
      },
      {
        //path: 'auth/login', redirectTo: 'dashboard', pathMatch: 'full',
        path: '**',redirectTo: 'principal'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'ControlCompras',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'proveedores',
        title: 'proveedores',
        loadComponent: () => import('./dashboard/pages/modulos/controlcompras/proveedores/proveedores.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Proveedor/:id',
        title: 'proveedor',
        loadComponent: () => import('./dashboard/pages/modulos/controlcompras/proveedor/proveedor.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      
      //modulo: Inventarios
      {
        //path: 'auth/login', redirectTo: 'dashboard', pathMatch: 'full',
        path: '**',redirectTo: 'principal'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }

];
