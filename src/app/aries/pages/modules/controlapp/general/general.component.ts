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
// //Interface
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

  ],
  
  providers: [MessageService],
  templateUrl: './General.component.html',
  styleUrl: './General.component.scss',

})
export default class GeneralComponent  {

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
    id_sat_usocfdi: [1],
    id_sat_regimenfiscal: [1]
  });

  constructor(
    private fb: FormBuilder,
    private servicio: GeneralService,
    private messageService: MessageService, )
    {}

    //==============================================================================================================
  // Crud Para Proveedores:
 public Almacenar = () => {
  // ?=========================================================================
  this.frmGeneral.controls['id_estatus'].setValue(parseInt(this.frmGeneral.value.id_estatus !== null ? this.frmGeneral.value.id_estatus : 1 ));
  this.frmGeneral.controls['id_tipo'].setValue(parseInt( this.frmGeneral.value.id_tipo !== null ? this.frmGeneral.value.id_tipo : 1 ));
  //validamos que no este el mensaje en pantalla
  // this.ConfirmacionMdl  = false;
  // bloqueamos el boton
  // this.BtnSpinner   = true;
  // bloqueamos pantalla
   this.Ariesblocked = true;
  //===============================
  // this.servicio.AlmacenarProveedor(this.frmGeneral.value).subscribe(resp => {
    // switch (resp.IdMensj) {
    //   case 3:
        //============================================================
        // this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
        // this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
        // this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
        // this.ConfirmacionMsjMdl.detalle = resp.Solucion;
        // this.ConfirmacionMdl = true;
        // desbloqueamos la pantalla
         this.Ariesblocked = false;
      //   break;
      // case 2:
        //============================================================
        // this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
        // this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
        // this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
        // this.ConfirmacionMsjMdl.detalle = resp.Detalle;
         // mostramos el resultado de la informacion
        //  this.ConfirmacionMdl  = true;
        // desbloqueamos la pantalla
         this.Ariesblocked = false;
      //   break;
      // default:
        //============================================================
        // this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
        // this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
        // this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
        // this.ConfirmacionMsjMdl.detalle = resp.Detalle;
        //============================================================
        // instanciamos elmismo formulario para actualizar
        // this.frmGeneral.setValue(this.frmGeneral.value);
        // // agregamos el ID para generar la actualizacion
        // this.frmGeneral.controls['id'].setValue(parseInt(resp.Id));
        // this._id = parseInt(resp.Id);
        // // mostramos el resultado de la informacion
        // this.ConfirmacionMdl  = true;
        // // desbloqueamos la pantalla
         this.Ariesblocked     = false;
        // break;
  //   }
  //   this.BtnSpinner = false;
  // });
}

    // metodo para agregar un nuevo proveedor
   public NuevoGeneral = () => {
     // reiniciamos el formulario
     this.frmGeneral.setValue(this.MdlGeneral);
     // prime trabaja con String lo pasamos a String el valor numerico
     this.frmGeneral.controls['id_estatus'].setValue("1");
     this.frmGeneral.controls['id_tipo'].setValue("1");
     // solo reiniciamos las variables visuales
    //  this.usoCFDI = "";
    //  this.RegimenCFDI = "";
    //  this._id =-1;
      // mensaje para verificar la captura de la direccion del sat
      this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue información.'});

   }

}
