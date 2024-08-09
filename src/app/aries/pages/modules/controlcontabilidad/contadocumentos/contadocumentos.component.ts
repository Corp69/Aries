//angular
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

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
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { list } from '@shared/interfaces/Aries';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { LstDocumentoService } from './services/LstDocumento.service';
import { ConfirmacionMensaje } from './interfaces/documentos';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contadocumentos',
  standalone: true,
  imports: [ 

    CommonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    BlockUIModule,
    CardModule,
    ToastModule,
    DividerModule,
    MessageModule,
    TooltipModule,
    ProgressSpinnerModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    TableModule
  ],
 
  providers: [
  
    MessageService,
    DatePipe
  
  ],
  templateUrl: './contadocumentos.component.html',
  styleUrl: './contadocumentos.component.scss'
})
export default class ContadocumentosComponent implements OnInit  {

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

  // bloqueamos el boton
  public BtnSpinner: boolean = false;

  // listados
  public lstEstus: list[] = [];

  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };


  // variables de tabla
  //tabla
  public DataSource: any;
  public DataSourceColumnas: any;

  // busqueda
  public busqueda: string = "";

  public frm: FormGroup = this.fb.group({
    _fechainicial: [ null,[Validators.required, Validators.minLength(1)]],
    _fechafinal:  [ null,[Validators.required, Validators.minLength(1)]],
    _idestatus: [ null,[Validators.required, Validators.minLength(1)] ]
  });

  constructor(
    private fb: FormBuilder,
    private DatePipe: DatePipe,
    private messageService: MessageService,
    private servicio: LstDocumentoService,
    private router: Router
  ) {}
  
  public ngOnInit(): void {
    
      //listado 
      this.servicio.Lstestatus().subscribe((resp) => { this.lstEstus= resp.Detalle; });
    
  }
  
  
  //btn nuevo
  public Nuevo() {
   
    this.frm.controls['_fechainicial'].setValue( new Date() );
    this.frm.controls['_fechafinal'].setValue(  new Date());
    this.frm.controls['_idestatus'].setValue(null);

  }


  //btn nuevo
  public  buscar() {
       //=======================================================================================
    //conversion de fecha
    this.frm.controls['_fechainicial'].setValue(this.DatePipe.transform( this.frm.value._fechainicial, "dd/MM/yyyy"));
    this.frm.controls['_fechafinal'].setValue(this.DatePipe.transform(  this.frm.value._fechafinal, "dd/MM/yyyy"));
    this.frm.controls['_idestatus'].setValue(parseInt(this.frm.value._idestatus));
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;


    //consumo del eschema
    this.servicio.Buscar( this.frm.value ).subscribe(resp => {
      console.log(resp);
      
      switch ( resp.IdMensj ) {
        case 3:
          //============================================================
          this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
          this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
          this.ConfirmacionMsjMdl.detalle = resp.Solucion;
          this.ConfirmacionMdl = true;
          // desbloqueamos la pantalla
          this.Ariesblocked = false;
          break;
        case 2:
          //============================================================
          this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
          this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
          this.ConfirmacionMsjMdl.detalle = resp.Detalle;
           // mostramos el resultado de la informacion
           this.ConfirmacionMdl  = true;
          // desbloqueamos la pantalla
          this.Ariesblocked = false;
          break;
        default:
          //============================================================
          //validamos que no venga vacio
          if ( resp.Detalle.lst_comprobantes_fiscales.data.length == 0 ) {
               // mensaje para verificar la captura de la direccion del sat
            this.messageService.add(
              {
                key: 'tc', 
                severity:'info', 
                summary: 'info',
                detail: 'Busqueda realizada, no hay registros.'
              });
              //registros dejamos en vacio 
              this.DataSource         = [];
              this.DataSourceColumnas = [];

          }
          else{
            this.DataSource         = resp.Detalle.lst_comprobantes_fiscales.data;
            this.DataSourceColumnas = Object.keys(this.DataSource[0]);
          }
          // desbloqueamos la pantalla
          this.Ariesblocked     = false;
          break;
      }
      this.BtnSpinner    = false;
    });
    //=============================
       // busqueda 
       this.busqueda = " Busqueda realizada: " +  this.frm.value._fechainicial + " al " +  this.frm.value._fechafinal;
       //===========================================
       // reiniciamos el formulario 
       this.frm.controls['_idestatus'].setValue( null );
       this.frm.controls['_fechainicial'].setValue( null );
       this.frm.controls['_fechafinal'].setValue(  null );

  }

  public selectRowActividad(  id: number ){ this.router.navigate([ `/ControlPMI/Actividad/${ id }`]);}
  
// public  selectRow( args: any ){
//   this.router.navigate([ `{ args.Numero }`]);
// }
 
//  public eliminarRow( args: any ){
//   this._id = args.Numero;
//   this.mdleliminar = true;
//   this.Ariesblocked = true;
// }

}
