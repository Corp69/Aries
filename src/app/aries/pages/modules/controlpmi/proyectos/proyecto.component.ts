import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// prime NG
import { DividerModule } from 'primeng/divider';
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
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ProyectoService } from './Services/proyecto.service';
import { MdlProyecto } from './models/MdlProyecto';
//shared 
import { ConfirmacionMensaje, list } from '@shared/interfaces/Aries';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';


@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [

    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //shared 
    ConfirmacionComponent,

        //prime NG
        KeyFilterModule,
        InputGroupModule,
        InputGroupAddonModule,
        DividerModule,
        MessageModule,
        DropdownModule,
        CardModule,
        ProgressSpinnerModule,
        DialogModule,
        TooltipModule,
        ButtonModule,
        RippleModule,
        BlockUIModule,
        DividerModule,
        ToastModule,

  ],
  providers: [
    MessageService
  ],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss'
})
export default class ProyectoComponent implements OnInit {
  //==============================================================================================================
  //modelos:
  public MdlProyecto: MdlProyecto = new MdlProyecto();
  // variable que bloquea la vista
   public Ariesblocked: boolean  = false;
  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;

  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

  // bloqueamos el boton
  public BtnSpinner: boolean  = false;
    
  //==============================================================================================================
  // Listados:
  public lstestatus: list[] = [];

  //==============================================================================================================
  //Formularios del app:
  public frm: FormGroup = this.fb.group({
    id:           [-1],
    id_estatus:   [null, [Validators.required, Validators.minLength(1)]],
    nombre:       [null, [Validators.required, Validators.minLength(5)]],
    problematica: [null, [Validators.required, Validators.minLength(5)]],
    objetivo:     [null, [Validators.required, Validators.minLength(5)]],
    alcance:      [null, [Validators.required, Validators.minLength(5)]],
  });


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private servicio: ProyectoService )
    {}
    // una vez carga el componente
   public ngOnInit(): void {
      //=========================================================================================================================
      //carga listados
      this.servicio.lstEstatus().subscribe(resp => { this.lstestatus  = resp.Detalle; });
    }

    public Nuevo(){
       // reiniciamos el formulario
    this.frm.setValue(this.MdlProyecto);
    // prime trabaja con String lo pasamos a String el valor numerico
    this.frm.controls['id_estatus'].setValue("1");
    // solo reiniciamos las variables visuales
    //this._id = -1;
     // mensaje para verificar la captura de la direccion del sat
     this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del Proyecto y guarde su información.'});
    }
   
    public Almacenar(){
    // ?=========================================================================
    //validamos que no este el mensaje en pantalla
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    //===============================
    this.servicio.Almacenar(this.frm.value).subscribe(resp => {
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
          this.frm.setValue(this.frm.value);
          // agregamos el ID para generar la actualizacion
          this.frm.controls['id'].setValue(parseInt(resp.Id));
          //this._id = parseInt(resp.Id);
          // mostramos el resultado de la informacion
          this.ConfirmacionMdl  = true;
          // desbloqueamos la pantalla
          this.Ariesblocked     = false;
          break;
      }
      this.BtnSpinner = false;
    });

    }

    public lst(){

    }

}
