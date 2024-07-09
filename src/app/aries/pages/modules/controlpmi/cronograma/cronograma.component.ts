import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
//servicio 
import { CronogramaService } from './Services/cronograma.service';
import { MdlCronograma } from './models/MdlCronograma';
import { ConfirmacionMensaje, list } from '@shared/interfaces/Aries';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [ //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

        //shared 
        ConfirmacionComponent,


        //prime NG
        InputGroupModule,
        InputGroupAddonModule,
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
        CalendarModule

 ],
 providers: [
   MessageService,
   DatePipe
 ],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.scss'
})
export default class ExtensionComponent implements OnInit{
  //==============================================================================================================
  //modelos:
  public MdlCronograma: MdlCronograma = new MdlCronograma();
  // variable que bloquea la vista
   public Ariesblocked: boolean  = false;
  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;

  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

  // bloqueamos el boton
  public BtnSpinner: boolean  = false;
  
  public _id: number  = -1;
    
  //==============================================================================================================
  // Listados:
  public lstestatus:   list[] = [];
  public lstProyecto:  list[] = [];

  //==============================================================================================================
  //Formularios del app:
  public frm: FormGroup = this.fb.group({
    id:              [-1],
    id_pmi_proyecto: [null,[Validators.required, Validators.minLength(1)]],
    id_estatus:      [null, [Validators.required, Validators.minLength(1)]],
    titulo:          ["", [Validators.required, Validators.minLength(5)]],
    objetivo:        ["", [Validators.required, Validators.minLength(5)]],
    fecha_inicio:    [ null ],
    fecha_fin:       [ null ],
    observaciones:   [""],
    comentarios:     [""]
  });


  constructor(
    private router: Router,
    private DatePipe: DatePipe,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private servicio: CronogramaService )
    {}
    // una vez carga el componente
    public ngOnInit(): void {
      //=========================================================================================================================
      //carga listados
      this.servicio.lstEstatus().subscribe(resp => { this.lstestatus  = resp.Detalle; });
      this.servicio.lstProyecto().subscribe(resp => {
        
        this.lstProyecto  = resp.Detalle.map(item => {
          return {
              id: item.id,
              nombre: item.nombre.trim() // Puedes usar trim() para eliminar espacios adicionales al inicio o final del nombre
          };
      });

        
      
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
         //this.frm.setValue(resp.Detalle);
         // seteamos la informacion
         this.frm.controls['id'].setValue(resp.Detalle.id);
         this.frm.controls['id_pmi_proyecto'].setValue(resp.Detalle.id_pmi_proyecto);
         this.frm.controls['id_estatus'].setValue(resp.Detalle.id_estatus.toString());
         this.frm.controls['titulo'].setValue(resp.Detalle.titulo);
         this.frm.controls['objetivo'].setValue(resp.Detalle.objetivo);
         this.frm.controls['fecha_inicio'].setValue(  this.DatePipe.transform( new Date( resp.Detalle.fecha_inicio ), 'dd/MM/yyyy') )
         this.frm.controls['fecha_fin'].setValue( this.DatePipe.transform( new Date( resp.Detalle.fecha_fin ) , 'dd/MM/yyyy'));
         this.frm.controls['observaciones'].setValue(resp.Detalle.observaciones);
         this.frm.controls['comentarios'].setValue(resp.Detalle.comentarios);
        });
      }
    });
  }


    public Nuevo(){
        this._id = -1;
        // reiniciamos el formulario
        this.frm.setValue(this.MdlCronograma);
        // prime trabaja con String lo pasamos a String el valor numerico
        this.frm.controls['id_estatus'].setValue("1");
        // solo reiniciamos las variables visuales
        //this._id = -1;
         // mensaje para verificar la captura de la direccion del sat
         this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del Cronograma y guarde su información.'});
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
      this.router.navigate([ `/ControlPMI/Proyectos`]);
    }
}
