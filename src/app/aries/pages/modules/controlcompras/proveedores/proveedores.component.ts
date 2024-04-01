import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//shared
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
//prime ng
import { CardModule} from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
     // angular
     CommonModule,
     ReactiveFormsModule,
    // shared
    NombresComponent,
    //prime NG
    CardModule,
    BlockUIModule
    ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export default class ProveedoresComponent {

  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;
  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  // variable para modal
  public dlgbuscar: boolean = true;
  // Tabla a buscar.
  public GenericaTB: String = "proveedor";
  //======================================
  // Busqueda generica.
  public dlgBuscar =  () => { this.dlgbuscar = true; this.GenericaTB = "proveedor" }

  //constructor
  constructor(private router: Router ){}

  //==============================================================================================================
  // metodo generico de busqueda...
  public Busqueda( response: any) {
    // cargamos al objeto a buscar
    this.dlgbuscar = false;
    this.router.navigate(['/ControlCompras/Proveedor/' + parseInt(response.id)]);
  }

}
