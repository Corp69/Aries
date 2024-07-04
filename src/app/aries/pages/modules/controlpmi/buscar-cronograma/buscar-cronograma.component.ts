import { Component } from '@angular/core';
import ProyectosComponent from '@shared/pages/listados/pmi-proyectos/proyectos.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-buscar-cronograma',
  standalone: true,
  imports: [
        //prime 
        CardModule,
        //shared 
        ProyectosComponent
  ],
  templateUrl: './buscar-cronograma.component.html',
  styleUrl: './buscar-cronograma.component.scss'
})
export default class BuscarCronogramaComponent {


  // Tabla a eliminar
  public _tabla: string = "pmi_cronograma";
  // eschema y funcion a ejecutar 
  public _sc:          string = "pmi";
  public _fn:          string = "_app_lst_cliente";

}
