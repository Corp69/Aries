import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//shared
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
import { ProveedoresService } from './Services/Proveedores.service';
//prime ng
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { CardModule} from 'primeng/card';
import { DialogModule} from 'primeng/dialog';
import { TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';

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
    KeyFilterModule,
    InputGroupModule,
    DividerModule,
    InputGroupAddonModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    RippleModule,
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


    /**
   *
   * @param route
   * @param fb
   * @param servicio
   *
    //private datePipe: DatePipe,
   *
   */
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private servicio: ProveedoresService )
      {}
   //==============================================================================================================
  // metodo generico de busqueda...
  public Busqueda( response: any) {
    // cargamos al objeto a buscar
    this.dlgbuscar = false;
    this.router.navigate(['/ControlCompras/Proveedor/' + parseInt(response.id)]);

  }


}
