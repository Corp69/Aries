import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { kpiService } from './services/kpiService.service';

//prime 
//prime
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-kpipanel',
  standalone: true,
  imports: [
    //angular
    CommonModule,

    //prime 
    CardModule,
    DividerModule,
    TableModule,
    ChartModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    ProgressBarModule


  ],
  providers: [MessageService],
  templateUrl: './kpipanel.component.html',
  styleUrl: './kpipanel.component.scss'
})


export default class KpipanelComponent implements OnInit {
  
  public data: any = [];
  
  public tipo : String = "doughnut";
  

 constructor(
  private service: kpiService,
  private router: Router,
  private messageService: MessageService
 ){}
  
  
  public id: number = -1;

  public ngOnInit() 
  {
      this.service.getProyectos().subscribe( res => { 
        console.log( res );
        this.data  =  res.Detalle._app_lst_proyectos_usuario.lst;

        console.log( this.data );
      });  
  }

  public lstActividad ( id: number ){
      this.router.navigate([ `/ControlPMI/lstUserActividades/${id}`]);
  }

  public chartForma( valor: String ){
    this.data = null;
        switch (valor) {
            case "pie":
                this.tipo = valor;
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos_usuario.lst;});
                break;
            case "doughnut":
                this.tipo = valor;
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos_usuario.lst;});
                break;
            case "bar":
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos_usuario.lst;});
                this.tipo = valor;
                break;
            default:
                this.tipo = "pie";
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos_usuario.lst;});
                break;
        }  
    }

    public config(){
        this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'No tienes Permisos.'});
    }

}
