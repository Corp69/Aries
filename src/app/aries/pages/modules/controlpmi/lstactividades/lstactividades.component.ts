import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { lstactividadService } from './service/lstactividad.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmacionMensaje, list } from '@shared/interfaces/Aries';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Mdllst } from './models/Mdllst';
import { MdleliminarComponent } from '@shared/pages/modales/mdleliminar/mdleliminar.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-lstactividades',
  standalone: true,
  imports: [
    
    CommonModule,
    ReactiveFormsModule,

     //prime 
     CardModule,
     DropdownModule,
     TableModule,    
     TooltipModule,
     ToastModule,
     ButtonModule,
     BlockUIModule,
     ProgressSpinnerModule,
     MessageModule,
     DividerModule,
    //shared
    MdleliminarComponent,
    ConfirmacionComponent,
  ],
  providers: [
  
    MessageService
  
  ],
  templateUrl: './lstactividades.component.html',
  styleUrl: './lstactividades.component.scss'
})
export default class LstactividadesComponent implements  OnInit {
  
    // listados
    public lstEstus: list[] = [];
    public lstProyecto: list[] = [];

    // bloqueamos el boton
    public BtnSpinner: boolean = false;
    // variable que bloquea la vista
    public Ariesblocked: boolean = false;
  
  //modelos:
  public Mdllst: Mdllst = new Mdllst();
    
   //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

   //======================================
  // variables de tabla
    //tabla
    public DataSource: any;
    public DataSourceColumnas: any;

    public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }

    //Formularios del app:
    public frm: FormGroup = this.fb.group({
      _id_proyecto: [ null,[Validators.required, Validators.minLength(1)]],
      _id_estatus:  [ null,[Validators.required, Validators.minLength(1)]]
    });

    constructor(
      private fb: FormBuilder,
      private servicio: lstactividadService,
      private messageService: MessageService,
      private router: Router
    ) {}
  
    public ngOnInit(): void {
      //listado 
      this.servicio.Lstestatus().subscribe((resp) => {  this.lstEstus    = resp.Detalle; });
      this.servicio.lstProyecto().subscribe(resp => {
        this.lstProyecto  = resp.Detalle.map(item => {
          return {
              id: item.id,
              nombre: item.nombre.trim() // Puedes usar trim() para eliminar espacios adicionales al inicio o final del nombre
          };
      });
      });
    }
  
    public Nuevo(){
      this.frm.setValue( this.Mdllst );
    }

    public buscar(){
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
      this.servicio.Buscar( this.frm.value ).subscribe(resp => {
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
            if ( resp.Detalle._app_lst_cronograma_lst_actividades.lst.length == 0 ) {
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
              this.DataSource  = resp.Detalle._app_lst_cronograma_lst_actividades.lst;
              this.DataSourceColumnas = Object.keys(this.DataSource[0]);
            }
            // desbloqueamos la pantalla
            this.Ariesblocked     = false;
            break;
        }
        this.BtnSpinner    = false;
      });
    }

    //============================================================
    // Redireccion  Actividad 
    public selectRowCronograma( id: number ){ this.router.navigate([ `/ControlPMI/Cronograma/${ id }`]);}
    public selectRowActividad(  id: number ){ this.router.navigate([ `/ControlPMI/Actividad/${ id }`]);}
    ////============================================================
   //A gregar una nueva Actibvidad
    public Agregar(){ this.router.navigate([ `/ControlPMI/Actividad/-1`]);}
    




    //============================================================
    // Eliminar Actividad 

    //==============================================================================================================
    // Modal: mensaje Confirmacion falso para no cargar la modal
    public mdleliminar: boolean = false;
    
    public tabla: String ="pmi_actividades";
    //el id del registro a eliminar
    public _id: number = -1;
    
    public eliminarRow( id: number ){
      this._id = id;
      this.mdleliminar = true;
      this.Ariesblocked = true;
    }
    
      //=======================================
     // metodo generico de busqueda...
     public eliminacion( response: any) {
      // cargamos al objeto a buscar
      this.mdleliminar  = false;
      // recargamos la data
      switch ( response ) {
        case false:
          this.messageService.add(
            {
              key: 'tc', 
              severity:'info', 
              summary: 'info',
              detail: 'Eliminación, Cancelada'
            });
          break;
        default:
          this.messageService.add(
            {
              key: 'tc', 
              severity:'success', 
              summary: 'Registro',
              detail:  'Eliminado: Correctamente!'
            });
            this.servicio.RecargarBuscar().subscribe(resp => {
              switch ( resp.IdMensj ) {
                case 3:
                  //============================================================
                  this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
                  this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
                  this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
                  this.ConfirmacionMsjMdl.detalle = resp.Solucion;
                  this.ConfirmacionMdl = true;
                  break;
                case 2:
                  //============================================================
                  this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
                  this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
                  this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
                  this.ConfirmacionMsjMdl.detalle = resp.Detalle;
                   // mostramos el resultado de la informacion
                   this.ConfirmacionMdl  = true;
                  break;
                default:
                  //============================================================
                  //validamos que no venga vacio
                  if ( resp.Detalle._app_lst_cronograma_lst_actividades.lst.length == 0 ) {
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
                    this.DataSource = resp.Detalle._app_lst_cronograma_lst_actividades.lst;
                  }
                  break;
              }
            });
        break;
      }
      // cancelamos el stop 
      this.Ariesblocked = false;
      // reiniciamos el id del registro que se elimino
      this._id = -1;
    }
    


}
