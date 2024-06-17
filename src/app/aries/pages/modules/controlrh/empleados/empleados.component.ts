import { Component } from '@angular/core';

//shared 
import FechaComponent from '@shared/pages/listados/fecha/fecha.component';
// primeNG
import { CardModule } from 'primeng/card';




@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    FechaComponent,
    CardModule
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export  default class EmpleadosComponent {

 // Tabla a eliminar
 public _tabla: string = "rh_empleado";
 // eschema y funcion a ejecutar 
 public _sc:          string = "rh";
 public _fn:          string = "_app_lst_persona";

 //redireccion variables
 public _routerM: string = "ControlRh";
 public _routerL: string = "empleado";

}
