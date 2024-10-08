import { Routes } from '@angular/router';
import { AuthGuard } from './auth/login/guards/auth.guard';

export const routes: Routes = [

  //Authenticacion
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
  //======================================================
  //SPACE 
  {
    path: 'space',
    loadComponent: () => import('./space/Space.component'),
    children: [
      {
        path: 'principal',
        title: 'EC - Principal.',
        loadComponent: () => import('./space/pages/principal/principal.component'),
      },

      //======================
      //? terminos y condiciones
      {
        path: 'contacto',
        title: 'EC - Contacto',
        loadComponent: () => import('./space/pages/modules/contactanos/contacto/contacto.component'),
      },
      {
        path: 'referencias',
        title: 'EC - Referencias',
        loadComponent: () => import('./space/pages/modules/contactanos/referencias/referencias.component'),
      },
      {
        path: 'nosotros',
        title: 'EC - Nosotros',
        loadComponent: () => import('./space/pages/modules/nosotros/informacion/informacion.component'),
      },
      {
        path: 'productos',
        title: 'EC - Productos',
        loadComponent: () => import('./space/pages/modules/nosotros/productos/productos.component'),
      },
      {
        path: 'terminos',
        title: 'EC - Terminos y Condiciones',
        loadComponent: () => import('./space/pages/modules/terminoscondiciones/terminos/terminos.component'),
      },
      {
        //path: '', redirectTo: 'login', pathMatch: 'full',
        path: '**',redirectTo: 'principal'
      }
    ]
  },
  //====================================================================================================
  //Publico FACTURA
  {
    path: 'publico',
    loadComponent: () => import('./public/principal.component'),
    children: [
      {
        path:  'factura',
        title: 'factura',
        loadComponent: () => import('./public/factura/index/index.component'),
      },
      {
        path:  'descarga',
        title: 'Descargas XML',
        loadComponent: () => import('./public/factura/descargas/descarga.component'),
      },
      {
        path:  'nueva',
        title: 'Nueva Factura',
        loadComponent: () => import('./public/factura/nueva/nueva.component'),
      },
      {
        path:  'recuperapdf',
        title: 'Recuperar PDF',
        loadComponent: () => import('./public/factura/recuperaPdf/recupera.component'),
      },
      {
        path: '**', redirectTo: 'factura', pathMatch: 'full',
        //path: '**',redirectTo: 'publico'
      }
    ]
  },  
  //? ==============================================
  //?Publico Membresias -  CITAS 
  {
    path: 'consultorio',
    loadComponent: () => import('./public/principal.component'),
    children: [
      {
        path:  'inicio',
        title: 'MEM - Inicio',
        loadComponent: () => import('./public/membresias/citas/index/index.component'),
      },
      {
        path:  'cita',
        title: 'MEM - Generar Cita',
        loadComponent: () => import('./public/membresias/citas/dentista/dentista.component'),
      },
      // {
      //   path:  'calendario',
      //   title: 'MEM - Calendario Citas ',
      //   loadComponent: () => import('./public/'),
      // },
      {
        path: '**', redirectTo: 'inicio', pathMatch: 'full',
        //path: '**',redirectTo: 'publico'
      }
    ]
  },  
  //aries
  {
    path: 'aries',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      {
        path:  'principal',
        title: 'Aries - Bienvenido',
        loadComponent: () => import('./aries/pages/principal/principal.component'),
      },
      {
        //path: 'auth/login', redirectTo: 'dashboard', pathMatch: 'full',
        path: '**',redirectTo: 'principal'
      }
    ]
  },  
  // aplicacion 
  {
    path: 'ControlEmpresa',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'Empresa/:id',
        title: 'APP: Empresa',
        loadComponent: () => import('./aries/pages/modules/controlapp/general/general.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Sucursal/:id',
        title: 'App: Sucursales',
        loadComponent: () => import('./aries/pages/modules/controlapp/extensiones/extension.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      }
    ]
  },
  //!=======================
  //? MEMBRESIAS  
  {
    path: 'ControlMembresias',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'calendario',
        title: 'MEM - Calendario',
        loadComponent: () => import('./aries/pages/modules/controlmembresias/calendario/calendario.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'catalogo',
        title: 'MEM - Catalogo Membresias',
        loadComponent: () => import('./aries/pages/modules/controlmembresias/catalogo/catalogo.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'citas/:id',
        title: 'MEM - Generar Cita',
        loadComponent: () => import('./aries/pages/modules/controlmembresias/cita/cita.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'membresias/:id',
        title: 'MEM - Generar Membresia',
        loadComponent: () => import('./aries/pages/modules/controlmembresias/membresia/membresia.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      }
    ]
  },
  //contabilidad
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
        title: 'Contabilidad: Comprobante Fiscal',
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
        path:  'Cuentas',
        title: 'Contabilidad: Cuentas',
        loadComponent: () => import('./aries/pages/modules/controlcontabilidad/cuentas/cuentas.component'),
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
  //compras
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
      {
        path:  'Domicilio/:id',
        title: 'Domicilio',
        loadComponent: () => import('./aries/pages/modules/controlcompras/domicilios/domicilios.component'),
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
  //ventas
  {
    path: 'ControlVentas',
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
        path:  'Domicilio/:id',
        title: 'CV: Domicilios',
        loadComponent: () => import('./aries/pages/modules/controlventas/domicilios/domicilios.component'),
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
  //inventarios
  {
    path: 'ControlInventarios',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      {
        path:  'Almacenes',
        title: 'Almacenes',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/almacenes/almacenes.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Almacen/:id',
        title: 'Almacen',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/almacen/almacen.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Bitacora/:id',
        title: 'Bitacora',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/bitacora/bitacora.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documentos',
        title: 'Documentos',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/invdocumentos/invdocumentos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documento/:id',
        title: 'Documento',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/invdocumento/invdocumento.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Recepcion/:id',
        title: 'Recepcion',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/recepcion/recepcion.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'productos',
        title: 'Productos',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/serviciosproductos/serviciosproductos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'producto/:id',
        title: 'producto',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/serviciosproducto/serviciosproducto.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'impuestos/:id',
        title: 'impuestos',
        loadComponent: () => import('./aries/pages/modules/controlinventarios/impuestos/impuestos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        //path: 'auth/login', redirectTo: 'dashboard', pathMatch: 'full',
        path: '**',redirectTo: 'principal'
      }
    ]
  },
  //rh
  {
    path: 'ControlRh',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: Compras
      {
        path:  'Empleados',
        title: 'RH - Empleados',
        loadComponent: () => import('./aries/pages/modules/controlrh/empleados/empleados.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'empleado/:id',
        title: 'RH - Empleado',
        loadComponent: () => import('./aries/pages/modules/controlrh/empleado/empleado.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Departamentos',
        title: 'RH - Departamentos',
        loadComponent: () => import('./aries/pages/modules/controlrh/departamentos/departamentos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Domicilio/:id',
        title: 'RH - Domicilio',
        loadComponent: () => import('./aries/pages/modules/controlrh/domicilios/domicilios.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Departamento/:id',
        title: 'RH - Departamento',
        loadComponent: () => import('./aries/pages/modules/controlrh/departamento/departamento.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Puestos',
        title: 'RH - Ppuestos',
        loadComponent: () => import('./aries/pages/modules/controlrh/puestos/puestos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Puesto/:id',
        title: 'RH - Puesto',
        loadComponent: () => import('./aries/pages/modules/controlrh/puesto/puesto.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documentos',
        title: 'RH - Documentos',
        loadComponent: () => import('./aries/pages/modules/controlrh/documentos/documentos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Documento/:id',
        title: 'RH - Documento',
        loadComponent: () => import('./aries/pages/modules/controlrh/documento/documento.component'),
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
  //PMI
  {
    path: 'ControlPMI',
    loadComponent: () => import('./aries/Aries.component'),
    canActivate:[ AuthGuard ],
    canMatch:[ AuthGuard],
    children: [
      //modulo: PMI
      {
        path:  'Equipos/:id',
        title: 'PMI - Equipos',
        loadComponent: () => import('./aries/pages/modules/controlpmi/equipos/equipos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Proyectos',
        title: 'PMI - Proyectos',
        loadComponent: () => import('./aries/pages/modules/controlpmi/listado/listado.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Proyecto/:id',
        title: 'PMI - Proyecto',
        loadComponent: () => import('./aries/pages/modules/controlpmi/proyectos/proyecto.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      //modulo: Compras
      // {
      //   path:  'EquiposRHempleado/:id',
      //   title: 'PMI - Equipos - Empleados',
      //   loadComponent: () => import('./aries/pages/modules/controlpmi/equipoRhempleado/equiposRh.component'),
      //   canActivate:[ AuthGuard ],
      //   canMatch:[ AuthGuard]
      // },
      {
        path:  'TabCronograma',
        title: ' PMI- Tablero Cronograma ',
        loadComponent: () => import('./aries/pages/modules/controlpmi/tablero-cronograma/tablero-cronograma.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'buscarCronograma',
        title: ' PMI- Buscar Cronograma ',
        loadComponent: () => import('./aries/pages/modules/controlpmi/buscar-cronograma/buscar-cronograma.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Cronograma/:id',
        title: ' PMI- Cronograma ',
        loadComponent: () => import('./aries/pages/modules/controlpmi/cronograma/cronograma.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'lstCronograma/:id',
        title: ' PMI- Cronograma ',
        loadComponent: () => import('./aries/pages/modules/controlpmi/listcronograma/listcronograma.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'lstEquipos',
        title: ' PMI - Equipos ',
        loadComponent: () => import('./aries/pages/modules/controlpmi/lstequipos/lstequipos.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'Usuario',
        title: ' PMI - Info. Usuario ',
        loadComponent: () => import('./aries/pages/modules/controlpmi/usuario/usuario.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'admin/:id',
        title: ' PMI - Info. Gestor ',
        loadComponent: () => import('./aries/pages/modules/controlpmi/admin/admin.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },
      {
        path:  'lstActividades',
        title: 'PMI - Actividades',
        loadComponent: () => import('./aries/pages/modules/controlpmi/lstactividades/lstactividades.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },

      {
        path:  'KpiActividades',
        title: 'PMI - Usuario',
        loadComponent: () => import('./aries/pages/modules/controlpmi/kpipanel/kpipanel.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },

      {
        path:  'lstUserActividades/:id',
        title: 'PMI - Usuario',
        loadComponent: () => import('./aries/pages/modules/controlpmi/lst-user-actividades/lst-user-actividades.component'),
        canActivate:[ AuthGuard ],
        canMatch:[ AuthGuard]
      },


      {
        path:  'Actividad/:id',
        title: 'PMI - Actividad',
        loadComponent: () => import('./aries/pages/modules/controlpmi/actividades/actividad.component'),
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
    redirectTo: 'space/principal',
    pathMatch: 'full'
  }

];
