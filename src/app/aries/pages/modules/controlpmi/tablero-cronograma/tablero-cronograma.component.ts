import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//prime
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TabCrongramaService } from './services/TabCrongrama.service';
import { ProgressBarModule } from 'primeng/progressbar';


@Component({
  selector: 'app-tablero-cronograma',
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
  templateUrl: './tablero-cronograma.component.html',
  styleUrl: './tablero-cronograma.component.scss'
})
export  default class TableroCronogramaComponent implements OnInit {
  
  public data: any = [];
  
  public tipo : String = "pie";
  

 constructor(
  private service: TabCrongramaService,
  private router: Router
 ){}
  
  
  public id: number = -1;

  public ngOnInit() 
  {
      this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos.lst; console.log( this.data)});
  }

  public lstActividad ( id: number ){
      this.router.navigate([ `/ControlPMI/lstCronograma/${id}`]);
  }

  public chartForma( valor: String ){
    this.data = null;
        switch (valor) {
            case "pie":
                this.tipo = valor;
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos.lst;});
                break;
            case "doughnut":
                this.tipo = valor;
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos.lst;});
                break;
            case "bar":
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos.lst;});
                this.tipo = valor;
                break;
            default:
                this.tipo = "pie";
                this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos.lst;});
                break;
        }  
    }

    
    public config( id: number ){
        this.router.navigate([ `/ControlPMI/Cronograma/${id}`]);
    }



}
