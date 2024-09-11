// angular 
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// shared 
import { ConfirmacionMensaje } from '@shared/interfaces/Aries';

// prime ng 
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import {MessageService} from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';

//--
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { listados } from './interface/impuesto';
import { MdlImpuesto } from './models/MdlImpuesto';
import { ImpuestoService } from './Services/Impuesto.service';





@Component({
  selector: 'app-impuestos',
  standalone: true,
  imports: [ 
  
     //angular
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
 
      //prime ng 
    ToastModule,
    BlockUIModule,
    CardModule,
    DividerModule,
    MessageModule,
 
    //shared 
    ConfirmacionComponent,
 
    //--
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputTextareaModule,
    //--
    DropdownModule,
    ProgressSpinnerModule,
    ButtonModule


  ],
  providers: [ MessageService ],
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.scss'
})
export default class ImpuestosComponent implements OnInit, AfterViewInit {

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;

  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

   //==============================================================================================================
  //Config. de la app: Bloqueo de botones
  public BtnSpinnerFederal: boolean = false;

  public BtnSpinnerEstatal: boolean = false;


   // listados 
  public lstestatus:  listados[] = [];
  
    //==============================================================================================================
  //modelos:
  public MdlImpuesto: MdlImpuesto = new MdlImpuesto();

   //==============================================================================================================
  //Formularios del app:
  public frmImpuestoE: FormGroup = this.fb.group({
    id:            [-1],
    descripcion:       [null, [Validators.required, Validators.minLength(0)]],
    importe:       [null, [Validators.required, Validators.minLength(0)]]
  
  });

  public frmImpuestoF: FormGroup = this.fb.group({
    id:            [-1],
    descripcion:       [null, [Validators.required, Validators.minLength(0)]],
    importe:       [null, [Validators.required, Validators.minLength(0)]]
  
  });

  constructor( 
    private messageService: MessageService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicio: ImpuestoService
  ){}
  
  ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.listEstatus().subscribe(resp => { 
 
      this.lstestatus  = resp.Detalle; });

        // == ================================= 
 }

/**
   * cargamos la data del proveedor una vez cargado todo los componentes
   */
public ngAfterViewInit(): void {

}


  // metodo para agregar un nuevo
  public NuevoEstatal = () => {

    // reiniciamos el formulario
    this.frmImpuestoE.setValue(this.MdlImpuesto);

     this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del Departamento y guarde su información.'});

  }

   // metodo para agregar un nuevo
   public NuevoFederal = () => {
  
    // reiniciamos el formulario
    this.frmImpuestoF.setValue(this.MdlImpuesto);

     this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del Departamento y guarde su información.'});

  }

  //==============================================================================================================
  // Crud Para Proveedores:
 public AlmacenarEstatal = () => {
  // ?=========================================================================
 
  //validamos que no este el mensaje en pantalla
  this.ConfirmacionMdl  = false;
  // bloqueamos el boton
  this.BtnSpinnerEstatal   = true;
  // bloqueamos pantalla
  this.Ariesblocked = true;
  //===============================
  this.servicio.AlmacenarEstatal(this.frmImpuestoE.value).subscribe(resp => {
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
        this.frmImpuestoE.setValue(this.frmImpuestoE.value);
        // agregamos el ID para generar la actualizacion
        this.frmImpuestoE.controls['id'].setValue(parseInt(resp.Id));
        // mostramos el resultado de la informacion
        this.ConfirmacionMdl  = true;
        // desbloqueamos la pantalla
        this.Ariesblocked     = false;
        break;
    }
    this.BtnSpinnerEstatal = false;
  });
}

 //==============================================================================================================
  // Crud Para Proveedores:
  public AlmacenarFederal = () => {
    // ?=========================================================================
   
    //validamos que no este el mensaje en pantalla
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinnerFederal   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    //===============================
    this.servicio.AlmacenarFederal(this.frmImpuestoF.value).subscribe(resp => {
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
          this.frmImpuestoF.setValue(this.frmImpuestoF.value);
          // agregamos el ID para generar la actualizacion
          this.frmImpuestoF.controls['id'].setValue(parseInt(resp.Id));
          // mostramos el resultado de la informacion
          this.ConfirmacionMdl  = true;
          // desbloqueamos la pantalla
          this.Ariesblocked     = false;
          break;
      }
      this.BtnSpinnerFederal = false;
    });
  }

}
