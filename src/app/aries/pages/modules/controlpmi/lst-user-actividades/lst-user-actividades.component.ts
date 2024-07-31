import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    ProgressBarModule,
    CheckboxModule


  ],
  providers: [
    MessageService
  ],
  templateUrl: './lst-user-actividades.component.html',
  styleUrl: './lst-user-actividades.component.scss'
})
export default class LstUserActividadesComponent {
  
  public data:        any = [];
  public actividades: any = [];
  public _id: number = -1;

// variable que bloquea la vista
 public Ariesblocked: boolean  = false;
  
 constructor(
  private service: UsuarioService,
  private route: ActivatedRoute,
  private messageService: MessageService,
 ){
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        this._id = +params['id'];
        // AGREGAMOS LA INFORMACION AL FORMULARIO
        this.service.lstActividades(this._id).subscribe(resp => {  
          console.log( resp.Detalle._app_lst_actividades_empledado );
          if ( resp.Detalle._app_lst_actividades_empledado.act.length == 0 ) {
            // mensaje para verificar la captura de la direccion del sat
             this.messageService.add(
               {
                 key: 'tc', 
                 severity:'info', 
                 summary: 'info',
                 detail: 'no hay registros.'
               });
           //registros dejamos en vacio 
          this.data        =  resp.Detalle._app_lst_actividades_empledado.lst;
          this.actividades = [];
         
         }
         else{ 
          this.data         =  resp.Detalle._app_lst_actividades_empledado.lst;
          this.actividades  =  resp.Detalle._app_lst_actividades_empledado.act;
         }
        });
      }
      else {
        this.data         =  [];
        this.actividades  =  [];
      }
    });
  }  
  
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
            
            this.messageService.add({key: 'tc', 
                severity:'success', 
                summary: 'info', 
                detail: res.Detalle });

            this.service.lstActividades(this._id).subscribe(resp => {  
              //============================================================
              //validamos que no venga vacio
              if ( resp.Detalle._app_lst_actividades_empledado.act.length == 0 ) {
                    // mensaje para verificar la captura de la direccion del sat
                 this.messageService.add(
                   {
                     key: 'tc', 
                     severity:'info', 
                     summary: 'info',
                     detail: 'no hay registros.'
                   });
                   //registros dejamos en vacio 
                   this.actividades = resp.Detalle._app_lst_actividades_empledado.act;
               }
               else{
                this.actividades  = [];
               }
           });          
          break;
        }
      });
    }


  //============================================================================= 
}
