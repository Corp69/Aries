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
      //modulo: RH
      {
        path:  'empleados',
        title: 'empleados',
        loadComponent: () => import('./dashboard/pages/modulos/controlrh/empleado/empleado.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'empleados/:id',
        title: 'empleados',
        loadComponent: () => import('./dashboard/pages/modulos/controlrh/empleado/empleado.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },

      //modulo: Inventarios

      //modulo: compras
      {
        path:  'controlcompras/proveedores/:id',
        title: 'proveedores',
        loadComponent: () => import('./dashboard/pages/modulos/controlcompras/proveedores/proveedores.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      
      //modulo: Inventarios
      
      {
        path:  'principal',
        title: 'principal',
        loadComponent: () => import('./dashboard/pages/principal/principal.component'),
      },
      {
        path:  'principal',
        title: 'principal',
        loadComponent: () => import('./dashboard/pages/principal/principal.component'),
      },
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
  }

];
