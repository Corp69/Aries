import { Component } from '@angular/core';
//shared 
import ProyectosComponent from '@shared/pages/listados/pmi-proyectos/proyectos.component';
//prime
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [

    //prime 
    CardModule,
    //shared 
    ProyectosComponent

  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export default class ListadoComponent {
  
   // Tabla a eliminar
   public _tabla: string = "pmi_proyectos";
   // eschema y funcion a ejecutar 
   public _sc:          string = "pmi";
   public _fn:          string = "_app_lst_cliente";
 
   //redireccion variables
   public _routerM: string = "ControlPMI";
   public _routerL: string = "Proyecto";


}
