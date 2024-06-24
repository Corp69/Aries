import { Component } from '@angular/core';

//shared 
import ProyectosComponent from '@shared/pages/listados/pmi-proyectos/proyectos.component';
//prime
import { CardModule } from 'primeng/card';



@Component({
  selector: 'app-listcronograma',
  standalone: true,
  imports: [

     //prime 
     CardModule,
     //shared 
     ProyectosComponent

  ],
  templateUrl: './listcronograma.component.html',
  styleUrl: './listcronograma.component.scss'
})
export default class ListcronogramaComponent {
  
   // Tabla a eliminar
   public _tabla: string = "pmi_cronograma";
   // eschema y funcion a ejecutar 
   public _sc:          string = "pmi";
   public _fn:          string = "_app_lst_cliente";


}
