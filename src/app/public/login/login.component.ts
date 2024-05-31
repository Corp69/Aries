import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// shared
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
//interface
import { ConfirmacionMensaje } from './interface/confirmacion';
//servicios
import { LoginService } from './services/login.service';
//primeNG 
import { DividerModule} from 'primeng/divider';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { TooltipModule} from 'primeng/tooltip';
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { BlockUIModule } from 'primeng/blockui';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            //angular
            CommonModule,
            //shared
            ConfirmacionComponent,
            CargaComponent,
           //primeng
            KeyFilterModule,
            BlockUIModule, 
            TooltipModule,
            PasswordModule,
            DividerModule,
            ReactiveFormsModule,
            ButtonModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export default class LoginComponent implements OnInit {
  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar 
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: '', mensaje: '', detalle: '' };
  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

  //formulario
  public myForm: FormGroup = this.fb.group({
    USUARIO: ['', [Validators.required, Validators.minLength(3)]],
    PASSS: [0, [Validators.required, Validators.min(0)]]
  });

  //injectamos servicio
  private servicio = inject( LoginService);

  constructor( private fb: FormBuilder, private router: Router ) {}

  // iniciar sesion
  public onSave() {
    //bloqueamos la pantalla
    this.Ariesblocked = true;
    // iniciamos session al servicio
    this.servicio.inicioSesion3(this.myForm.value).subscribe(resp => {
      // validamos con un switch
      switch (resp.data.user.id) {
        case undefined:
          this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
          this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = "Verifica Tu Pago, Verifica tu Usario activo, Igualforma Envia un Correo." //resp.Mensaje; 
          this.ConfirmacionMsjMdl.detalle = "OrionWS: Comunica Verifica La licencia. O Comunicar a Departamento TI. La licencia." //resp.Solucion; 
          this.Ariesblocked = false;
          this.ConfirmacionMdl = true;
          break;
        default:
          // cargamos la informacion del usuario a localstorage
          localStorage.setItem('id',      resp.data.user.id!);
          localStorage.setItem('Usuario', resp.data.user.usuario!);
          localStorage.setItem('token',   resp.data.token!);
          this.Ariesblocked = false;
          this.router.navigate(['/aries/principal']);
          break;
      }
    });
  }

  //inicializamos los valores del formulario
  ngOnInit() {
    this.myForm = this.fb.group({ USUARIO: "", PASSS: "" });
  }

}
