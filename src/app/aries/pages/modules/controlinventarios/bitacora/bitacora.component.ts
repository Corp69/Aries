// angular 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// shared 
import { ConfirmacionMensaje } from '@shared/interfaces/Aries';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';

// prime ng 
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import {MessageService} from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

// interface
import { listados } from './interface/bitacoramoneda';

//service
import { BitacoraMonedaService } from './Services/BitacoraMoneda.service';
import { MdlBitacoraMoneda } from './models/MdlBitacoraMoneda';


@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [

    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    ProgressBarModule,
    ProgressSpinnerModule,
    ButtonModule,
    ConfirmacionComponent,

      //prime ng 
    ToastModule,
    BlockUIModule,
    CardModule,
    DividerModule,
    MessageModule,

  ],
  providers: [ MessageService ],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss'
})
export default class BitacoraComponent implements OnInit, AfterViewInit{

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

   //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;

  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

    //==============================================================================================================
  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;

   // variable para ver el id del departamento
   public _id: number = -1;

   // listados 
  public lstestatus:  listados[] = [];
  
    //==============================================================================================================
  //modelos:
  public MdlBitacoraMoneda: MdlBitacoraMoneda = new MdlBitacoraMoneda();

    //==============================================================================================================
  //Formularios del app:
  public frmMoneda: FormGroup = this.fb.group({
    id:            [-1],
    prefijo:       [null, [Validators.required, Validators.minLength(0)]],
    descripcion:       [null, [Validators.required, Validators.minLength(0)]],
    tc:       [null, [Validators.required, Validators.minLength(0)]],
    codigo:       [""],
    activa:       [true]
  
  });

  constructor( 
    private messageService: MessageService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicio: BitacoraMonedaService
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
  this.route.params.subscribe(params => {
    if (+params['id'] > -1) {
      this._id = +params['id'];
      // AGREGAMOS LA INFORMACION AL FORMULARIO
      this.servicio.Datainfo(+params['id']).subscribe(resp => {
       // seteamos la informacion
       this.frmMoneda.controls['id'].setValue(resp.Detalle.id);
       this.frmMoneda.controls['prefijo'].setValue(resp.Detalle.prefijo);
       this.frmMoneda.controls['descripcion'].setValue(resp.Detalle.descripcion);
       this.frmMoneda.controls['tc'].setValue(resp.Detalle.tc);
       this.frmMoneda.controls['codigo'].setValue(resp.Detalle.codigo);
       this.frmMoneda.controls['activa'].setValue(resp.Detalle.activa);
      });
    }
  });
}

 // metodo para agregar un nuevo
 public Nuevo = () => {


   // reiniciamos el formulario
    this.frmMoneda.setValue(this.MdlBitacoraMoneda);

   
   this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del Departamento y guarde su información.'});

}

//==============================================================================================================
  // Crud Para Proveedores:
  public Almacenar = () => {
    // ?=========================================================================
   
    //validamos que no este el mensaje en pantalla
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    //===============================
    this.servicio.Almacenar(this.frmMoneda.value).subscribe(resp => {
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
          this.frmMoneda.setValue(this.frmMoneda.value);
          // agregamos el ID para generar la actualizacion
          this.frmMoneda.controls['id'].setValue(parseInt(resp.Id));
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
