import { Component } from '@angular/core';
// shared
import AppDomiciliosComponent from '@shared/pages/documentos/domicilios/domicilios.component';
import TabalaDomiciliosComponent from '@shared/pages/tablas/domicilios/domicilios.component';

//prime ng
import { CardModule} from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';


@Component({
  selector: 'app-domicilios',
  standalone: true,
  imports: [
    //shared
    AppDomiciliosComponent,
    TabalaDomiciliosComponent,
    //prime NG
    CardModule,
    BlockUIModule
  ],
  templateUrl: './domicilios.component.html',
  styleUrl: './domicilios.component.scss'
})

export default class DomiciliosComponent {

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  // Tabla a insertar.
  public Tabla: String = "proveedor_domicilio";

}
