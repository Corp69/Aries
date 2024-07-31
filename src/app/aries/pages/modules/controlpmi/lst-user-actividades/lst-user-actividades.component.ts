import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

//prime
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { UsuarioService } from './services/usuario.service';
import { ToastModule} from 'primeng/toast';
import { MessageService} from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';


interface JsActividad {
  id: number;
  id_estatus: number;
}



@Component({
  selector: 'app-lst-user-actividades',
  standalone: true,
  imports: [
  
    //angular
    CommonModule,

    //prime 
    DialogModule,
    CardModule,
    DividerModule,
    TableModule,
    ChartModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
    BlockUIModule,
    ProgressBarModule,
    CheckboxModule


  ],
  providers: [
    MessageService
  ],
  templateUrl: './lst-user-actividades.component.html',
  styleUrl: './lst-user-actividades.component.scss'
})
export default class LstUserActividadesComponent implements OnInit, AfterViewInit {
  
  public data:        any = [];
  public actividades: any = [];
  
  public tipo : String = "doughnut";

// variable que bloquea la vista
 public Ariesblocked: boolean  = false;
  
 constructor(
  private service: UsuarioService,
  private router: Router,
  private messageService: MessageService,
 ){}


  public ngAfterViewInit(): void {
  this.service.lstActividades( 1 ).subscribe( res => { 
      console.log( res.Detalle._app_lst_actividades_empledado.lst[0] );
      this.data         =  res.Detalle._app_lst_actividades_empledado.lst[0];
      this.actividades  =  this.data.actividades;
  });

  }
  
  
  public id: number = -1;

  public ngOnInit() {}

   //=============================================================================
   // cerrar actividad
    public mdlCerrar: boolean = false;
    public JSactiviad: JsActividad = { id: -1, id_estatus: 6 };

    public ModificarRow( _id: number ){
      this.mdlCerrar = true; 
      this.JSactiviad = { "id": _id, "id_estatus": 6 }
    }
    
    public confirmar(){
      this.mdlCerrar = false;
      this.service.Almacenar( this.JSactiviad ).subscribe( res => { 
        console.log( res );
        switch (res.IdMensj) {
          case 3:
            break;
          case 2:
            break;
          default:
            this.messageService.add({key: 'tc', severity:'success', summary: 'info', detail: res.Detalle });
          break;
        }
      });
    }


  //============================================================================= 
}
