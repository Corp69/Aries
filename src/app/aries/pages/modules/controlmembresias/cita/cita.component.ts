import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// prime NG
import { DividerModule } from 'primeng/divider';
import { MessageModule} from 'primeng/message';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { CardModule} from 'primeng/card';
import { DialogModule} from 'primeng/dialog';
import { TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from './Services/Cita.service';
import { CalendarModule } from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ConfirmacionMensaje } from '@shared/interfaces/Aries';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [
    
    //angular 
    CommonModule,
    ReactiveFormsModule,

     //prime NG
     InputGroupModule,
     DividerModule,
     MessageModule,
     DropdownModule,
     CardModule,
     ProgressSpinnerModule,
     DialogModule,
     TooltipModule,
     ButtonModule,
     BlockUIModule,
     ToastModule,
     CalendarModule,
     InputTextareaModule,



     //shared 
     ConfirmacionComponent

  ],providers:[
    MessageService,
    DatePipe
  ],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.scss'
})
export default class CitaComponent {
  
  //bloqueo de pantalla 
  public Ariesblocked: boolean = false;
  // bloqueamos el boton
  public BtnSpinner: boolean = false;


    //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private DatePipe: DatePipe,
    private messageService: MessageService,
    private servicio: CitaService )
    {}
    
  //==============================================================================================================
  //Formulario:
  public frm: FormGroup = this.fb.group({
    id:           [-1],
    descripcion:  ["", [Validators.required, Validators.minLength(10)]],
    fecha_inicio: ["", [Validators.required, Validators.minLength(5)]],
    fecha_final:  ["", [Validators.required, Validators.minLength(5)]]
  });

  //==============================================================================================================
  //Obtencion de la fecha:
    public Fecha_inicia( args: any){
      this.frm.controls['fecha_inicio'].setValue( this.DatePipe.transform( args, "yyyy-MM-dd HH:SS:ss"));
    };

    public Fecha_termina( args: any){
      this.frm.controls['fecha_final'].setValue( this.DatePipe.transform( args, " yyyy-MM-dd HH:SS:ss"));
   };

    //==============================================================================================================
    //Crear Una CIta:
    public crearCita (){
      console.log( this.frm.value );

      this.servicio.NuevaCita(this.frm.value).subscribe(resp => {
        
        
        console.log( resp);

        
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

  //==============================================================================================================
  //Navegacion:
    public irCalendario(){
      this.router.navigate([ `ControlMembresias/calendario`]);
    }

}
