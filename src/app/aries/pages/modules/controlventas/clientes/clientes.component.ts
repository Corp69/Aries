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
 // Tabla a insertar.
 public _sc:          string = "venta";
 public _fn:          string = "_app_lst_cliente";

}
