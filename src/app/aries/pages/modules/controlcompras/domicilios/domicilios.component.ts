import { Component } from '@angular/core';

//prime ng
import { CardModule} from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import AppDomiciliosComponent from '@shared/pages/documentos/domicilios/domicilios.component';


@Component({
  selector: 'app-domicilios',
  standalone: true,
  imports: [

    //shared
    AppDomiciliosComponent,
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

}
