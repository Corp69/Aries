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
    path: 'aries',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      {
        path:  'principal',
        title: 'principal',
        loadComponent: () => import('./aries/pages/principal/principal.component'),
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
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'proveedores',
        title: 'proveedores',
        loadComponent: () => import('./aries/pages/modules/controlcompras/proveedores/proveedores.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Proveedor/:id',
        title: 'proveedor',
        loadComponent: () => import('./aries/pages/modules/controlcompras/proveedor/proveedor.component'),
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
    path: 'ControlRh',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'Empleados',
        title: 'Empleados',
        loadComponent: () => import('./aries/pages/modules/controlrh/empleados/empleados.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Empleado/:id',
        title: 'Empleado',
        loadComponent: () => import('./aries/pages/modules/controlrh/empleado/empleado.component'),
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
