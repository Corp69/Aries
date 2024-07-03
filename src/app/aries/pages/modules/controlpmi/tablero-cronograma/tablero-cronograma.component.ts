import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//prime
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { Subscription } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TabCrongramaService } from './services/TabCrongrama.service';


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
     TooltipModule

  ],
  templateUrl: './tablero-cronograma.component.html',
  styleUrl: './tablero-cronograma.component.scss'
})
export  default class TableroCronogramaComponent implements OnInit {
  
    
  public data: any = [];

  public dataCronogramas: any = [];


 constructor(
  private service: TabCrongramaService,
  private router: Router,
  private route: ActivatedRoute,
 ){}
  
  data2: any;
  chartOptions: any;
  subscription: Subscription;
  config: any;

  public id: number = -1;

  public ngOnInit() {
              this.service.getProyectos().subscribe( res => {
                  this.data =  res.Detalle._app_lst_proyectos.lst;
                  
                  console.log(  this.data )
          });
  
      this.data2 = {
          labels: ['Pendientes','Terminadas'],
          datasets: [
              {
                  data: [10, 5 ],
                  backgroundColor: [
                      "#42A5F5",
                      "#66BB6A"
                  ],
                  hoverBackgroundColor: [
                      "#64B5F6",
                      "#81C784"
                  ]
              }
          ]
      };

      
  }

  updateChartOptions() {
      this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
  }

  getLightTheme() {
      return {
          plugins: {
              legend: {
                  labels: {
                      color: '#495057'
                  }
              }
          }
      }
  }

  getDarkTheme() {
      return {
          plugins: {
              legend: {
                  labels: {
                      color: '#ebedef'
                  }
              }
          }
      }
  }

  public lstActividad ( id: number ){
      this.router.navigate([ `/ControlPMI/lstCronograma/${id}`]);
  }

  

  displayModal: boolean;

  displayBasic: boolean;

  displayBasic2: boolean;

  displayMaximizable: boolean;

  displayPosition: boolean;

  position: string;


  public lstVerActividad (){
      this.position = 'top';
      this.displayPosition = true;
  }


}
