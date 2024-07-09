import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericaComponent } from '@shared/pages/busquedas/generica/generica.component';
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MdlExtension } from './models/MdlExtension';
import { MessageService } from 'primeng/api';
// servicios
import { ExtensionService } from './Services/Extension.service';

@Component({
  selector: 'app-extension',
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
  templateUrl: './extension.component.html',
  styleUrl: './extension.component.scss'

  
})
export default class ExtensionComponent {

   //==============================================================================================================
  //modelos:
  public MdlExtension: MdlExtension = new MdlExtension();

  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;
  
  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  //==============================================================================================================
  //Formularios del app:
  public frmExtension: FormGroup = this.fb.group({
    id:     [-1],
    descripcion:    [, [Validators.required, Validators.minLength(3)]],
    id_app_general: [1],
    activo:    [, [Validators.required, Validators.minLength(3)]]
    
  });

  constructor(
    private fb: FormBuilder,
    private servicio: ExtensionService,
    private messageService: MessageService, )
    {}

    //==============================================================================================================
  // Crud Para Proveedores:
 public Almacenar = () => {
  // ?=========================================================================
  this.frmExtension.controls['id_estatus'].setValue(parseInt(this.frmExtension.value.id_estatus !== null ? this.frmExtension.value.id_estatus : 1 ));
  this.frmExtension.controls['id_tipo'].setValue(parseInt( this.frmExtension.value.id_tipo !== null ? this.frmExtension.value.id_tipo : 1 ));
  //validamos que no este el mensaje en pantalla
  // this.ConfirmacionMdl  = false;
  // bloqueamos el boton
  // this.BtnSpinner   = true;
  // bloqueamos pantalla
   this.Ariesblocked = true;
  //===============================
  // this.servicio.AlmacenarProveedor(this.frmExtension.value).subscribe(resp => {
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
        // this.frmExtension.setValue(this.frmExtension.value);
        // // agregamos el ID para generar la actualizacion
        // this.frmExtension.controls['id'].setValue(parseInt(resp.Id));
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
   public NuevoExtension = () => {
     // reiniciamos el formulario
     this.frmExtension.setValue(this.MdlExtension);
     // prime trabaja con String lo pasamos a String el valor numerico
     this.frmExtension.controls['id_estatus'].setValue("1");
     this.frmExtension.controls['id_tipo'].setValue("1");
     // solo reiniciamos las variables visuales
    //  this.usoCFDI = "";
    //  this.RegimenCFDI = "";
    //  this._id =-1;
      // mensaje para verificar la captura de la direccion del sat
      this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue información.'});

   }

}
