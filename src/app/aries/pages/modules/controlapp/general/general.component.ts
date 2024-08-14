import { MdlGeneral } from './models/MdlGeneral';



// import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// modelos
import { GeneralService } from './Services/General.service';
// shared
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
// servicios
// import { ProveedorService } from './Services/Proveedor.service';

// import { ConfirmacionMensaje, listados } from './interface/proveedor';
// prime NG
import { DividerModule } from 'primeng/divider';
import { MessagesModule} from 'primeng/messages';
import { MessageModule} from 'primeng/message';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { CardModule} from 'primeng/card';
import { DialogModule} from 'primeng/dialog';
import { TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { GenericaComponent } from '@shared/pages/busquedas/generica/generica.component';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ConfirmacionMensaje } from './interface/General';
import { ActivatedRoute } from '@angular/router';
import MdlbuscarclienteComponent from "../../../../../shared/pages/modales/mdlbuscarcliente/mdlbuscarcliente.component";


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //shared
    GenericaComponent,
    CargaComponent,
    ConfirmacionComponent,
    NombresComponent,
    //prime NG
    KeyFilterModule,
    InputGroupModule,
    InputGroupAddonModule,
    DividerModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    RippleModule,
    BlockUIModule,
    ToastModule,


    // componente compartido 
    MdlbuscarclienteComponent
],
  providers: [MessageService],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',

})
export default class GeneralComponent  {

  // variable para ver el id del proveedor
  public _id: number = -1;

  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;

  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

   //==============================================================================================================
  //modelos:
  public MdlGeneral: MdlGeneral = new MdlGeneral();

  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;
  
  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  //==============================================================================================================
  //Formularios del app:
  public frmGeneral: FormGroup = this.fb.group({
    id:     [-1],
    rfc:    [, [Validators.required, Validators.minLength(3)]],
    observaciones:    [, [Validators.required, Validators.minLength(3)]],
    nombrecomercial:    [, [Validators.required, Validators.minLength(3)]],
    aviso_privacidad:    [, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private servicio: GeneralService,
    private messageService: MessageService, 
    private route: ActivatedRoute,)
    {}


    public ngAfterViewInit(): void {
      this.route.params.subscribe(params => {
        if (+params['id'] > -1) {
          this._id = +params['id'];
          // AGREGAMOS LA INFORMACION AL FORMULARIO
          this.servicio.Datainfo(+params['id']).subscribe(resp => {
           //this.frmGeneral.setValue(resp.Detalle);
           // seteamos la informacion
           this.frmGeneral.controls['id'].setValue(resp.Detalle.id);
           this.frmGeneral.controls['rfc'].setValue(resp.Detalle.rfc);
           this.frmGeneral.controls['observaciones'].setValue(resp.Detalle.observaciones);
           this.frmGeneral.controls['nombrecomercial'].setValue(resp.Detalle.nombrecomercial);
           this.frmGeneral.controls['aviso_privacidad'].setValue(resp.Detalle.aviso_privacidad);
          });
        }
      });
    }

    
    //==============================================================================================================
  // Crud Para Proveedores:
 public Almacenar = () => {
  // ?=========================================================================
  
 // validamos que no este el mensaje en pantalla
   this.ConfirmacionMdl  = false;
//   bloqueamos el boton
   this.BtnSpinner   = true;
//   bloqueamos pantalla
   this.Ariesblocked = true;
 // ===============================
   this.servicio.Almacenar(this.frmGeneral.value).subscribe(resp => {
     switch (resp.IdMensj) {
       case 3:
   //     ============================================================
         this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
         this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
         this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
         this.ConfirmacionMsjMdl.detalle = resp.Solucion;
         this.ConfirmacionMdl = true;
     //   desbloqueamos la pantalla
         this.Ariesblocked = false;
         break;
       case 2:
   //     ============================================================
         this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
         this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
         this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
         this.ConfirmacionMsjMdl.detalle = resp.Detalle;
     //     mostramos el resultado de la informacion
        this.ConfirmacionMdl  = true;
     //    desbloqueamos la pantalla
         this.Ariesblocked = false;
         break;
       default:
     //   ============================================================
         this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
         this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
         this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
         this.ConfirmacionMsjMdl.detalle = resp.Detalle;
     //   ============================================================
    //     instanciamos elmismo formulario para actualizar
         this.frmGeneral.setValue(this.frmGeneral.value);
    //     agregamos el ID para generar la actualizacion
         this.frmGeneral.controls['id'].setValue(parseInt(resp.Id));
         this._id = parseInt(resp.Id);
     //     mostramos el resultado de la informacion
         this.ConfirmacionMdl  = true;
      //   desbloqueamos la pantalla
         this.Ariesblocked     = false;
         break;
     }
     this.BtnSpinner = false;
   });
}

  //   metodo para agregar un nuevo proveedor
   public NuevoGeneral = () => {
  //    reiniciamos el formulario
     this.frmGeneral.setValue(this.MdlGeneral);
    
   //   solo reiniciamos las variables visuales
   
      this._id =-1;
  //     mensaje para verificar la captura de la direccion del sat
      this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue información.'});

   }

}

