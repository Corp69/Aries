// angular 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// shared 
import { ConfirmacionMensaje, listados } from './interface/puesto';

//modelos 
import { MdlPuesto } from './models/MdlPuesto';

//service 

import { PuestoService } from './Services/Puesto.service';


// prime ng 
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import {MessageService} from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';


@Component({
  selector: 'app-puesto',
  standalone: true,
  imports: [
   
     //angular
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
    
     //shared 
     ConfirmacionComponent,

     //prime ng 
     ToastModule,
     BlockUIModule,
     CardModule,
     DividerModule,
     MessageModule,
     TooltipModule,
     //--
     InputGroupModule,
     InputGroupAddonModule,
    //--
    DropdownModule,
    ButtonModule,
    ProgressSpinnerModule
  
    ],
  providers: [ MessageService ],
  templateUrl: './puesto.component.html',
  styleUrl: './puesto.component.scss'
  
})


export default class PuestoComponent implements OnInit {
  
  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

  // listados 
  public lstDep:  listados[] = [];

  //==============================================================================================================
  //modelos:
  public MdlPuesto: MdlPuesto = new MdlPuesto();



  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;

  //==============================================================================================================
  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;

    // variable para ver el id del puesto
    public _id: number = -1;


    // variables para mensaje actualizar guardar
    public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

  
  //==============================================================================================================
  //Formularios del app:
  public frmPuesto: FormGroup = this.fb.group({
    id:            [-1],
    id_hijo:       [null, [Validators.required, Validators.minLength(0)]],
    descripcion:   ["",   [Validators.required, Validators.minLength(3)]],
    observaciones: ["",   [Validators.required, Validators.minLength(3)]]
  });

  constructor(
     private messageService: MessageService,
     private fb: FormBuilder,
     private servicio: PuestoService
    ){}


  ngOnInit(): void {
     //=========================================================================================================================
    //carga listados
    this.servicio.lstdepartamento().subscribe(resp => { this.lstDep  = resp.Detalle._app_lst_departamentos; });
  
  }








   // metodo para agregar un nuevo
   public Nuevo = () => {
    // reiniciamos el formulario
    this.frmPuesto.setValue(this.MdlPuesto);
    // prime trabaja con String lo pasamos a String el valor numerico
    this.frmPuesto.controls['id_hijo'].setValue(null);
     // mensaje para verificar la captura de la direccion del sat
     this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del puesto y guarde su información.'});

  }


  
  //==============================================================================================================
  // Crud Para Proveedores:
 public Almacenar = () => {
  // ?=========================================================================
  this.frmPuesto.controls['id_hijo'].setValue(parseInt( this.frmPuesto.value.id_hijo !== null ? this.frmPuesto.value.id_hijo : 1 ));
  //validamos que no este el mensaje en pantalla
  this.ConfirmacionMdl  = false;
  // bloqueamos el boton
  this.BtnSpinner   = true;
  // bloqueamos pantalla
  this.Ariesblocked = true;
  //===============================
  this.servicio.Almacenar(this.frmPuesto.value).subscribe(resp => {
    switch (resp.IdMensj) {
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
        this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
        this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
        this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
        this.ConfirmacionMsjMdl.detalle = resp.Detalle;
        //============================================================
        // instanciamos elmismo formulario para actualizar
        this.frmPuesto.setValue(this.frmPuesto.value);
        // agregamos el ID para generar la actualizacion
        this.frmPuesto.controls['id'].setValue(parseInt(resp.Id));
        this._id = parseInt(resp.Id);
        // mostramos el resultado de la informacion
        this.ConfirmacionMdl  = true;
        // desbloqueamos la pantalla
        this.Ariesblocked     = false;
        break;
    }
    this.BtnSpinner = false;
  });
}





}