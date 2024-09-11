import { Component, OnInit } from '@angular/core';
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule} from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessageModule} from 'primeng/message';
import { TooltipModule} from 'primeng/tooltip';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { listados } from '@shared/pages/tablas/tbdomicilios/interface/Domicilio';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ContaDocService } from './Services/ContaDoc.service';
import { MdlFiscal } from './models/MdlFiscal';
//
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-contadocumento',
  standalone: true,
  imports: [ 

    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //--
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputTextareaModule,

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
  templateUrl: './contadocumento.component.html',
  styleUrl: './contadocumento.component.scss'
})
export default class ContadocumentoComponent implements OnInit {
 
//Config. de la app: Bloqueo de botones
public BtnSpinner: boolean = false;

  public lstEmpleado: listados[] = [];
  public lstCliente: listados[] = [];
  public lstProveedor: listados[] = [];
  public lstMoneda: listados[] = [];
  public lstExportacion: listados[] = [];
  public lstMetodoPago: listados[] = [];
  public lstCobro: listados[] = [];
  public lstComprobante: listados[] = [];
  public lstDomSuc: listados[] = [];
  public lstNominaTipo: listados[] = [];
  public lstEstatus: listados[] = [];


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
  // public Domicilios(){}
  public NuevoProvedor(){}
  public selectRowActividad(  id: number ){ this.router.navigate([ `/ControlPMI/Actividad/${ id }`]);}

  //modelos:
  public MdlFiscal: MdlFiscal = new MdlFiscal();

  public frm: FormGroup = this.fb.group({
    id: [ null,[]],
    ver: [ null,[]],
    serie: [ null,[]],
    folio: [ null,[Validators.required, Validators.minLength(1)]],
    fecha_creacion: [ null,[]],
    fecha: [ null,[]],
    id_rh_empleado: [ null,[]],
    id_cliente: [ null,[]],
    id_proveedor: [ null,[]],
    id_moneda: [ null,[]],
    tipo_cambio: [ null,[]],
    id_sat_exportacion: [ null,[]],
    id_metodopago: [ null,[]],
    id_sat_cobro: [ null,[]],
    id_sat_comprobante: [ null,[]],
    id_sucursal_domicilio: [ null,[]],
    id_sat_nomina_tipo: [ null,[]],
    id_estatus : [ null,[]],

  });
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicio: ContaDocService
  ) {}

  ngOnInit(): void {

    this.servicio.FisDoc(1).subscribe(resp => { 
      
      this.DataSource       = resp.Detalle.fis_comprobante_fiscal.data; 

      console.log(this.DataSource)
    });



    
//=========================================================================================================================
    //carga listados
    this.servicio.lstEmpleado().subscribe(resp =>  { this.lstEmpleado = resp.Detalle; });
    this.servicio.lstCliente().subscribe(resp =>  { this.lstCliente = resp.Detalle; });
    this.servicio.lstProveedor().subscribe(resp =>  { this.lstProveedor = resp.Detalle; });
    this.servicio.lstMoneda().subscribe(resp =>  { this.lstMoneda = resp.Detalle; });
    this.servicio.lstExportacion().subscribe(resp =>  { this.lstExportacion = resp.Detalle; });
    this.servicio.lstMetodoPago().subscribe(resp =>  { this.lstMetodoPago = resp.Detalle; });
    this.servicio.lstCobro().subscribe(resp =>  { this.lstCobro = resp.Detalle; });
    this.servicio.lstComprobante().subscribe(resp =>  { this.lstComprobante = resp.Detalle; });
    this.servicio.lstDomSuc().subscribe(resp =>  { this.lstDomSuc = resp.Detalle; });
    this.servicio.lstNominaTipo().subscribe(resp =>  { this.lstNominaTipo = resp.Detalle; });
    this.servicio.lstEstatus().subscribe(resp =>  { this.lstEstatus = resp.Detalle; });
  }


  }