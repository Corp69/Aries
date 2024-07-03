import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//prime
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { LstCronogramaService } from './services/lstCrongrama.service';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { Subscription } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-listcronograma',
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
     DialogModule
     

  ],
  templateUrl: './listcronograma.component.html',
  styleUrl: './listcronograma.component.scss'
})
export default class ListcronogramaComponent implements OnInit {
  
    
    public data: any = [];

    public dataCronogramas: any = [];


   constructor(
    private service: LstCronogramaService,
    private router: Router,
   ){}
    




    data2: any;

    chartOptions: any;

    subscription: Subscription;

    config: any;

    ngOnInit() {

           //hacemos el consumo de los cronogramas 
    this.service.getCronogramas(1).subscribe( res => {

        this.data =  res.Detalle._app_lst_cronogramas.lst;
        this.dataCronogramas =  res.Detalle._app_lst_cronogramas.lst[0].cronogramas;

        console.log( this.data );
        console.log( this.dataCronogramas );
        
 })

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
        this.router.navigate([ `/ControlPMI/Activiadad/${id}`]);
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
