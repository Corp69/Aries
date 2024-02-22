import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { EmpleadoService } from './Services/Empleado.service';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [  
    ReactiveFormsModule
  ],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.scss'
})
export default class EmpleadoComponent {


    //==============================================================================================================
  // Formularios
  public frmEmpleado: FormGroup = this.fb.group({
    id: [-1],
    nombre: [, [Validators.required, Validators.minLength(3)]],
    paterno: [, [Validators.required, Validators.minLength(3)]],
    materno: [, [Validators.required, Validators.minLength(3)]],
    codigo: [, [Validators.required, Validators.minLength(3)]],
    correo: [, [Validators.required, Validators.minLength(3)]],
    cuenta_banco: [, [Validators.required, Validators.minLength(3)]],
    clabe: [, [Validators.required, Validators.minLength(3)]],
    whatsapp: [, [Validators.required, Validators.minLength(3)]],
    observaciones: [, [Validators.required, Validators.minLength(3)]],
    contacto1: [, [Validators.required, Validators.minLength(3)]],
    contacto2: [, [Validators.required, Validators.minLength(3)]],
    nss: [, [Validators.required, Validators.minLength(3)]],
    rfc: [, [Validators.required, Validators.minLength(3)]],
    curp: [, [Validators.required, Validators.minLength(3)]],
    fecha_nacimiento: [ new Date()],
    fecha_ingreso: [ new Date()],
    id_rh_puesto: [-1, [Validators.required, Validators.min(0)]],
    id_sexo: [-1, [Validators.required, Validators.min(0)]],
    id_rh_estatus: [-1, [Validators.required, Validators.min(0)]],
    id_rh_grado: [-1, [Validators.required, Validators.min(0)]],
    id_rh_clasificacion: [-1, [Validators.required, Validators.min(0)]]
  });

    //==============================================================================================================
    constructor(
      private fb: FormBuilder,
      private servicio: EmpleadoService
      //private datePipe: DatePipe,
    ) {
  
    }





  public Almacenar(){
    
  }
  public NuevoProvedor(){

  }







}
