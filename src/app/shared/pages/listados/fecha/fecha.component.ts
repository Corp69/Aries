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
import { ActivatedRoute } from '@angular/router';

// prime NG
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

//servicio
import { LstFechaService } from './services/lstfecha.service';
import { ConfirmacionMensaje, list } from '@shared/interfaces/Aries';



@Component({
  selector: 'app-list-fecha',
  standalone: true,
  imports: [
    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

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
    CalendarModule,

    //shared
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
 
    _fecha_inicio: [null,[Validators.required, Validators.minLength(1)]],
    _fecha_final: [null,[Validators.required, Validators.minLength(1)]],
    _id_: [ null,[Validators.required, Validators.minLength(1)] ]
  });

  constructor(
    private fb: FormBuilder,
    private servicio: LstFechaService,
    private DatePipe: DatePipe,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  public ngOnInit(): void {
    //listado 
    this.servicio.Lstestatus().subscribe((resp) => { this.lstEstus= resp.Detalle; });
  }

  //btn nuevo
  public Nuevo() {}

  //btn nuevo
  public buscar() {

    this.frm.controls['_fecha_inicio'].setValue(this.DatePipe.transform( this.frm.value._fecha_inicio, 'dd/MM/YYYY'));
    this.frm.controls['_fecha_final'].setValue(this.DatePipe.transform(  this.frm.value._fecha_final,  'dd/MM/YYYY'));
    this.frm.controls['_id_'].setValue(parseInt(this.frm.value._id_));

       // bloqueamos el boton
       this.BtnSpinner   = true;
       // bloqueamos pantalla
       this.Ariesblocked = true;
       //===============================
       
       console.log( this.frm.value );
            this.servicio.Buscar( this.frm.value).subscribe(resp => {
            
              console.log( resp );

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
                  this.reloadTrigger = true;
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
                  // mostramos el resultado de la informacion
                  this.ConfirmacionMdl  = true;
                  // desbloqueamos la pantalla
                  this.Ariesblocked     = false;
                  break;
              }
              this.BtnSpinner    = false;
            });
       this.reloadTrigger   = false;
  }
}
