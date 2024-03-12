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
    path: 'ControlContable',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'Documentos',
        title: 'Documentos',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/contadocumentos/contadocumentos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documento/:id',
        title: 'Documento',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/contadocumento/contadocumento.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Ejercicios',
        title: 'Ejercicios',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/ejercicios/ejercicios.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Ejercicio/:id',
        title: 'Ejercicio',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/ejercicio/ejercicio.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Impuestos',
        title: 'Impuestos',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/impuestos/impuestos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Nominas',
        title: 'Nominas',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/nominas/nominas.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Nomina/:id',
        title: 'Nomina',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/nomina/nomina.component'),
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
    path: 'ControlCompras',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'Documentos',
        title: 'Documentos',
        loadComponent: () => import('./aries/pages/modules/controlcompras/documentocompras/documentocompras.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documento/:id',
        title: 'Documento',
        loadComponent: () => import('./aries/pages/modules/controlcompras/documentocompra/documentocompra.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
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
    path: 'ControlVenta',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'Cajas',
        title: 'Cajas',
        loadComponent: () => import('./aries/pages/modules/controlventas/cajas/cajas.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Caja/:id',
        title: 'Caja',
        loadComponent: () => import('./aries/pages/modules/controlventas/caja/caja.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Clientes',
        title: 'Clientes',
        loadComponent: () => import('./aries/pages/modules/controlventas/clientes/clientes.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Cliente/:id',
        title: 'Cliente',
        loadComponent: () => import('./aries/pages/modules/controlventas/cliente/cliente.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Cortes',
        title: 'Cortes',
        loadComponent: () => import('./aries/pages/modules/controlventas/cortes/cortes.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Corte/:id',
        title: 'Cortes',
        loadComponent: () => import('./aries/pages/modules/controlventas/corte/corte.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documentos',
        title: 'Documentos',
        loadComponent: () => import('./aries/pages/modules/controlventas/documentoventas/documentoventas.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documento/:id',
        title: 'Documento',
        loadComponent: () => import('./aries/pages/modules/controlventas/documentoventa/documentoventa.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
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
