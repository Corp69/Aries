//angular
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// prime NG
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

//servicio
import { LstFechaService } from './services/lstfecha.service';
import { ConfirmacionMensaje, list } from '@shared/interfaces/Aries';
import { MdleliminarComponent } from '@shared/pages/modales/mdleliminar/mdleliminar.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-list-fecha',
  standalone: true,
  imports: [
    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    //prime NG
    DividerModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    BlockUIModule,
    ToastModule,
    CalendarModule,
    TableModule,
    
    //shared
    MdleliminarComponent,
    ConfirmacionComponent,
  ],
  providers: [
  
    MessageService,
    DatePipe
  
  ],
  templateUrl: './fecha.component.html',
  styleUrl: './fecha.component.scss',
})
export default class FechaComponent implements OnInit {
  // variables entre componentes
  @Input()
  public fn: string = '';
  @Input()
  public sc: string = '';
  @Input()
  public tabla: string = '';
  
  // Redirect de la busqueda 
  @Input()
  public routeM: string = '';
  @Input()
  public routeL: string = '';


  // busqueda
  public busqueda: string = "";

  //el id del registro a eliminar
  public _id: number = -1;

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public mdleliminar: boolean = false;

  // listados
  public lstEstus: list[] = [];

  // bloqueamos el boton
  public BtnSpinner: boolean = false;
  // variable que bloquea la vista
  public Ariesblocked: boolean = false;
  
  public reloadTrigger: boolean = false;

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };


  //Formularios del app:
  public frm: FormGroup = this.fb.group({
    _fecha_inicio: [ null,[Validators.required, Validators.minLength(1)]],
    _fecha_final:  [ null,[Validators.required, Validators.minLength(1)]],
    _id_: [ null,[Validators.required, Validators.minLength(1)] ]
  });

  constructor(
    private fb: FormBuilder,
    private servicio: LstFechaService,
    private DatePipe: DatePipe,
    private messageService: MessageService,
    private router: Router
  ) {}
  public ngOnInit(): void {
    //listado 
    this.servicio.Lstestatus().subscribe((resp) => { this.lstEstus= resp.Detalle; });
  }

  //btn nuevo
  public Nuevo() {
   
    this.frm.controls['_fecha_inicio'].setValue( new Date() );
    this.frm.controls['_fecha_final'].setValue(  new Date());
    this.frm.controls['_id_'].setValue(null);

  }


  //btn nuevo
  public  buscar() {
    //=======================================================================================
    //conversion de fecha
    this.frm.controls['_fecha_inicio'].setValue(this.DatePipe.transform( this.frm.value._fecha_inicio, "dd/MM/yyyy"));
    this.frm.controls['_fecha_final'].setValue(this.DatePipe.transform(  this.frm.value._fecha_final, "dd/MM/yyyy"));
    this.frm.controls['_id_'].setValue(parseInt(this.frm.value._id_));
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    console.log( this.frm.value );
            this.servicio.Buscar( this.sc, this.fn, this.frm.value ).subscribe(resp => {
              console.log( resp.Detalle._app_lst_persona._lst.length  )
              console.log( resp )
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
                  this.reloadTrigger = true;
                  //============================================================
                  //validamos que no venga vacio
                  if ( resp.Detalle._app_lst_persona._lst.length == 0 ) {
                       // mensaje para verificar la captura de la direccion del sat
                    this.messageService.add(
                      {
                        key: 'tc', 
                        severity:'info', 
                        summary: 'info',
                        detail: 'Busqueda realizada, no hay registros.'
                      });
                  }
                  else{
                    this.DataSource         = resp.Detalle._app_lst_persona._lst;
                    this.DataSourceColumnas = Object.keys(this.DataSource[0]);
                  }
                  // desbloqueamos la pantalla
                  this.Ariesblocked     = false;
                  break;
              }
              this.BtnSpinner    = false;
            });
       this.reloadTrigger   = false;
       //=============================
       // busqueda 
       this.busqueda = " Busqueda realizada: " +  this.frm.value._fecha_inicio + " al " +  this.frm.value._fecha_final;
       //===========================================
       // reiniciamos el formulario 
       this.frm.controls['_id_'].setValue( null );
       this.frm.controls['_fecha_inicio'].setValue( null );
       this.frm.controls['_fecha_final'].setValue(  null );

  }

  //======================================
  // variables de tabla
    //tabla
    public DataSource: any;
    public DataSourceColumnas: any;

    public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }

  //=======================================
 // metodo generico de busqueda...
 public eliminacion( response: any) {
      // cargamos al objeto a buscar
      this.mdleliminar  = false;
      // recargamos la data
      console.log( response );
      switch ( response ) {
        case false:
          this.DataSource = [];
          this.DataSourceColumnas = [];
          break;
        default:
          this.messageService.add(
            {
              key: 'tc', 
              severity:'info', 
              summary: 'info',
              detail: 'Operación, cancelada'
            });
        break;
      }
      // cancelamos el stop 
      this.Ariesblocked = false;
      // reiniciamos el id del registro que se elimino
      this._id = -1;
}



public  ModificarRow( args: any ){
  this.router.navigate([ `/${this.routeM}/${ this.routeL}/${ args.Numero }`]);
}
 
 public eliminarRow( args: any ){
  console.log( args ); 
  this._id = args.Numero;
  this.mdleliminar = true;
  this.Ariesblocked = true;
}






}
