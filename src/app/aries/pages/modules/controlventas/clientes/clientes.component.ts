import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


//shared
import FechaComponent from '@shared/pages/listados/fecha/fecha.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [    

    ProgressBarModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    ToastModule,
  
    //shared 
    FechaComponent
  
  
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export default class ClientesComponent {
 
  //redireccion variables
  public _routerM: string = "ControlVentas";
  public _routerL: string = "Cliente";
 
  // Tabla a eliminar
 public _tabla: string = "cliente";
 // eschema y funcion a ejecutar 
 public _sc:          string = "venta";
 public _fn:          string = "_app_lst_persona";

}
