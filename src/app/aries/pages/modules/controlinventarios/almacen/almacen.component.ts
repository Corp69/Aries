import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AlmacenDocService } from './Services/AlmacenDoc.service';
import { MdlAlmacen } from './models/MdlAlmacen';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [  
    
    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    TableModule,
    CalendarModule

  ],
  providers: [ MessageService],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export default class AlmacenComponent implements OnInit {

  
  //Config. de la app: Bloqueo de botones
public BtnSpinner: boolean = false;

public lstmoneda: listados[] = [];

public lstCliente: listados[] = [];

public lstDocumento: listados[] = [];

public lstStatus: listados[] = [];


// variable que bloquea la vista
public Ariesblocked: boolean  = false;

// variables de tabla
//tabla
public DataSource: any;
public DataSourceColumnas: any;
 
public Almacenar() {
throw new Error('Method not implemented.');
}

public lstProveedores(){}
public Domicilios(){}
public NuevoProvedor(){}
public selectRowActividad(  id: number ){ this.router.navigate([ `/ControlPMI/Actividad/${ id }`]);}

//modelos:
public MdlAlmacen: MdlAlmacen = new MdlAlmacen();

public frm: FormGroup = this.fb.group({
  id: [ null,[Validators.required, Validators.minLength(1)]],
  ver: [ null,[Validators.required, Validators.minLength(1)]],
  serie: [ null,[Validators.required, Validators.minLength(1)]],
  folio: [ null,[Validators.required, Validators.minLength(1)]],
  fecha_creacion: [ null,[Validators.required, Validators.minLength(1)]],
  fecha: [ null,[Validators.required, Validators.minLength(1)]],
  id_rh_empleado: [ null,[Validators.required, Validators.minLength(1)]],
  id_cliente: [ null,[Validators.required, Validators.minLength(1)]],
  id_proveedor: [ null,[Validators.required, Validators.minLength(1)]],
  id_moneda: [ null,[Validators.required, Validators.minLength(1)]],
  tipo_cambio: [ null,[Validators.required, Validators.minLength(1)]],
  id_sat_exportacion: [ null,[Validators.required, Validators.minLength(1)]],
  id_metodopago: [ null,[Validators.required, Validators.minLength(1)]],
  id_sat_cobro: [ null,[Validators.required, Validators.minLength(1)]],
  id_sat_comprobante: [ null,[Validators.required, Validators.minLength(1)]],
  id_sucursal_domicilio: [ null,[Validators.required, Validators.minLength(1)]],
  id_sat_nomina_tipo: [ null,[Validators.required, Validators.minLength(1)]],
  id_estatus : [ null,[Validators.required, Validators.minLength(1)]],

});

constructor(
  private fb: FormBuilder,
  private router: Router,
  private servicio: AlmacenDocService
) {}

ngOnInit(): void {

  this.servicio.FisDoc(1).subscribe(resp => { 
    
    this.DataSource       = resp.Detalle.fis_comprobante_fiscal.data; 

    console.log(this.DataSource)
  });



//=========================================================================================================================
  //carga listados
  this.servicio.listMoneda().subscribe(resp => { this.lstmoneda       = resp.Detalle; });
  this.servicio.listStatus().subscribe(resp =>    { this.lstStatus = resp.Detalle; });
}


}
