import { Component } from '@angular/core';

//shared
import { TbpersonaComponent } from '@shared/pages/tablas/tbpersona/tbpersona.component';

// prime ng 
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [

    // shared 
    TbpersonaComponent,

    // prime ng 
    BlockUIModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    ToastModule

  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export  default class EmpleadosComponent {

   // variable que bloquea la vista
   public Ariesblocked: boolean  = false;

   // Tabla a buscar.
  public _tabla: String = "rh_empleado";


    //constructor
    constructor(private router: Router ){}


  //==============================================================================================================
  // metodo generico de busqueda...
  public Busqueda( response: any) {
    // cargamos al objeto a buscar
    //this.dlgbuscar = false;
    this.router.navigate(['/ControlCompras/Proveedor/' + parseInt(response.id)]);
  }

}
