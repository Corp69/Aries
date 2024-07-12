// angular 
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// shared 
import { listados, ConfirmacionMensaje } from '../puesto/interface/puesto';

//modelos
import { MdlDepartamento } from './models/MdlDepartamento';

//Service
import { DepartamentoService } from './Services/Departamento.service';

// prime ng 
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import {MessageService} from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
//--
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
//--
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-departamento',
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
     DropdownModule

  ],
  
  
  providers: [ MessageService ],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.scss'
})
export default class DepartamentoComponent implements OnInit, AfterViewInit {


  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

    //==============================================================================================================
  //modelos:
  public MdlDepartamento: MdlDepartamento = new MdlDepartamento();

  // listados 
  public lstDep:  listados[] = [];

  
  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  
  //==============================================================================================================
  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;

  
    // variable para ver el id del departamento
    public _id: number = -1;

    // variables para mensaje actualizar guardar
    public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };


  //==============================================================================================================
  //Formularios del app:
  public frmDepartamento: FormGroup = this.fb.group({
    id:            [-1],
    id_padre:       [null, [Validators.required, Validators.minLength(0)]],
    descripcion:   ["",   [Validators.required, Validators.minLength(3)]],
    observaciones: ["",   [Validators.required, Validators.minLength(3)]]
  
  });


  constructor( 
    private messageService: MessageService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicio: DepartamentoService
  ){}

  ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.lstdepartamento().subscribe(resp => { 
 
      this.lstDep  = resp.Detalle; });

        // == ================================= 
    this.servicio.verifyIDS().subscribe(resp => { 
      console.log( resp.Detalle._app_verifi_ids._rh_departamento.id);

    });
      
 }

/**
   * cargamos la data del proveedor una vez cargado todo los componentes
   */
public ngAfterViewInit(): void {
  this.route.params.subscribe(params => {
    if (+params['id'] > -1) {
      this._id = +params['id'];
      // AGREGAMOS LA INFORMACION AL FORMULARIO
      this.servicio.Datainfo(+params['id']).subscribe(resp => {
       // seteamos la informacion
       this.frmDepartamento.controls['id'].setValue(resp.Detalle.id);
       this.frmDepartamento.controls['id_padre'].setValue(resp.Detalle.id_padre);
       this.frmDepartamento.controls['descripcion'].setValue(resp.Detalle.descripcion);
       this.frmDepartamento.controls['observaciones'].setValue(resp.Detalle.observaciones);
      });
    }
  });
}

  // metodo para agregar un nuevo
  public Nuevo = () => {
    // reiniciamos el formulario
    this.frmDepartamento.setValue(this.MdlDepartamento);
    // prime trabaja con String lo pasamos a String el valor numerico
    this.frmDepartamento.controls['id_padre'].setValue(null);
     // mensaje para verificar la captura de la direccion del sat
     this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del Departamento y guarde su información.'});

  }

  //==============================================================================================================
  // Crud Para Proveedores:
 public Almacenar = () => {
  // ?=========================================================================
  this.frmDepartamento.controls['id_padre'].setValue(parseInt( this.frmDepartamento.value.id_padre !== null ? this.frmDepartamento.value.id_padre : 1 ));
  //validamos que no este el mensaje en pantalla
  this.ConfirmacionMdl  = false;
  // bloqueamos el boton
  this.BtnSpinner   = true;
  // bloqueamos pantalla
  this.Ariesblocked = true;
  //===============================
  this.servicio.Almacenar(this.frmDepartamento.value).subscribe(resp => {
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
        this.frmDepartamento.setValue(this.frmDepartamento.value);
        // agregamos el ID para generar la actualizacion
        this.frmDepartamento.controls['id'].setValue(parseInt(resp.Id));
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
