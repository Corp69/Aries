import { Component } from '@angular/core';
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule} from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessageModule} from 'primeng/message';
import { TooltipModule} from 'primeng/tooltip';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownModule } from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { listados } from '@shared/pages/tablas/tbdomicilios/interface/Domicilio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contadocumento',
  standalone: true,
  imports: [ 

    InputGroupModule,
    BlockUIModule,
    CardModule,
    ToastModule,
    DividerModule,
    MessageModule,
    TooltipModule,
    ProgressSpinnerModule,
    ButtonModule,
    DropdownModule,
    AccordionModule,
    CommonModule
   ],
   providers: [ MessageService],
  templateUrl: './contadocumento.component.html',
  styleUrl: './contadocumento.component.scss'
})
export default class ContadocumentoComponent {
 
//Config. de la app: Bloqueo de botones
public BtnSpinner: boolean = false;

  public lstmoneda: listados[] = [
    {"id": 1,"descripcion": "MXN"},
    {"id": 2,"descripcion": "USD"},
    {"id": 3,"descripcion": "EUR"},
    {"id": 4,"descripcion": "JPY"},
  ];

  public lstCliente: listados[] = [
    {"id": 1,"descripcion": "Nacional"},
    {"id": 2,"descripcion": "Extranjero"},
  ];

  public lstDocumento: listados[] = [
    {"id": 1,"descripcion": "Nota de Credito"},
    {"id": 2,"descripcion": "Nota de Debito"},
    {"id": 2,"descripcion": "Pagare"},
    {"id": 2,"descripcion": "Nomina"},
  ];


  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;


   
  public Almacenar() {
  throw new Error('Method not implemented.');
  }

  public lstProveedores(){}
  public Domicilios(){}
  public NuevoProvedor(){}
  
}
