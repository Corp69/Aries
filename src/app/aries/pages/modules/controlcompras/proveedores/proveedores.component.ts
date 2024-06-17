import { Component } from '@angular/core';

import FechaComponent from '@shared/pages/listados/fecha/fecha.component';


//shared 
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CardModule,
    FechaComponent
    ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export default class ProveedoresComponent {
  // Tabla a eliminar
  public _tabla: string = "proveedor";
  // eschema y funcion a ejecutar 
  public _sc:          string = "compras";
  public _fn:          string = "_app_lst_persona";

  //redireccion variables
  public _routerM: string = "ControlCompras";
  public _routerL: string = "Proveedor";
 

}
