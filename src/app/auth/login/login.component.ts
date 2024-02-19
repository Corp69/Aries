import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CardModule} from 'primeng/card';
import { CalendarModule } from "primeng/calendar";
import { DividerModule} from 'primeng/divider';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
            DividerModule,
            ReactiveFormsModule,
            DialogModule,
            CalendarModule,
            CardModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export default class LoginComponent implements OnInit {
  
  // ******************************************
  // variable: modales
  public visible:  boolean = false;
  public Titulo:   String  = 'Inicio De Session' 
  public Mensaje:  String  = 'Consulta de manera exitosa !' 
  public Detalle:  String  = 'No existe el Usuario en la base de datos' 

  public myForm: FormGroup = this.fb.group({
    USUARIO: ['', [Validators.required, Validators.minLength(3)]],
    PASSS: [0, [Validators.required, Validators.min(0)]]
  });

  private servicio = inject( LoginService);

  constructor( private fb: FormBuilder, private router: Router ) 
  {

  }

  public onSave() {
   console.log( this.myForm.value );
    this.servicio.inicioSesion3(this.myForm.value).subscribe(resp => {
      console.log( resp );
      switch (resp.data) {
        case undefined:
          this.Titulo = resp.Ttitulo;
          this.Mensaje = resp.Mensaje;
          this.Detalle = resp.Detalle;
          this.visible = true;
          break;
        default:
          localStorage.setItem('id', resp.data.user.id!);
          localStorage.setItem('Usuario', resp.data.user.usuario!);
          localStorage.setItem('token', resp.data.token!);
          this.router.navigate(['./dashboard/principal']);
          break;
      }
    });
  }


  ngOnInit() {

    this.myForm = this.fb.group({
      USUARIO: '',
      PASSS: ''
    });
  }

}
