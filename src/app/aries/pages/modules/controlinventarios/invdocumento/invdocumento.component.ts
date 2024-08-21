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
import { MdlFiscal } from './models/MdlFiscal';
import { InvDocService } from './Services/InvDoc.service';



@Component({
  selector: 'app-invdocumento',
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
  templateUrl: './invdocumento.component.html',
  styleUrl: './invdocumento.component.scss'
})
export default class InvdocumentoComponent implements OnInit{

  
//Config. de la app: Bloqueo de botones
public BtnSpinner: boolean = false;


//listados

public lstEmpleado: listados[] = [];
public lstCliente: listados[] = [];
public lstProveedor: listados[] = [];
public lstmoneda: listados[] = [];
public lstSatExport: listados[] = [];
public lstMetodoPago: listados[] = [];
public lstCobro: listados[] = [];
public lstComprobante: listados[] = [];
public lstSucDom: listados[] = [];
public lstNomTipo: listados[] = [];
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
public MdlFiscal: MdlFiscal = new MdlFiscal();

public frminvdoc: FormGroup = this.fb.group({
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
  private servicio: InvDocService
) {}

ngOnInit(): void {

  this.servicio.InvDoc(1).subscribe(resp => { 
    
    this.DataSource       = resp.Detalle.fis_comprobante_fiscal.data; 

    console.log(this.DataSource)
  });



//=========================================================================================================================
  //carga listados
  this.servicio.lstEmpleado().subscribe(resp =>    { this.lstEmpleado = resp.Detalle; });
  this.servicio.lstCliente().subscribe(resp =>    { this.lstCliente = resp.Detalle; });
  this.servicio.lstProveedor().subscribe(resp =>    { this.lstProveedor = resp.Detalle; });
  this.servicio.lstmoneda().subscribe(resp =>    { this.lstmoneda = resp.Detalle; });
  this.servicio.lstSatExport().subscribe(resp =>    { this.lstSatExport = resp.Detalle; });
  this.servicio.lstMetodoPago().subscribe(resp =>    { this.lstMetodoPago = resp.Detalle; });
  this.servicio.lstCobro().subscribe(resp =>    { this.lstCobro = resp.Detalle; });
  this.servicio.lstComprobante().subscribe(resp =>    { this.lstComprobante = resp.Detalle; });
  this.servicio.lstSucDom().subscribe(resp =>    { this.lstSucDom = resp.Detalle; });
  this.servicio.lstNomTipo().subscribe(resp =>    { this.lstNomTipo = resp.Detalle; });
  this.servicio.lstStatus().subscribe(resp =>    { this.lstStatus = resp.Detalle; });
}



}
