import { Component } from '@angular/core';
// shared
import AppDomiciliosComponent from '@shared/pages/documentos/domicilios/domicilios.component';

//prime ng
import { CardModule} from 'primeng/card';


@Component({
  selector: 'app-domicilios',
  standalone: true,
  imports: [
    //shared
    AppDomiciliosComponent,
    //prime NG
    CardModule
  ],
  templateUrl: './domicilios.component.html',
  styleUrl: './domicilios.component.scss'
})

export default class DomiciliosComponent {

  // Tabla a insertar.
  public _tabla:       String = "proveedor_domicilio";
  public _tabla_campo: string = "id_proveedor";

}
