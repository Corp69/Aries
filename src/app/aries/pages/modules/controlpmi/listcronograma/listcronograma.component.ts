import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
     TooltipModule
     

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
    private route: ActivatedRoute,
   ){}
    
    data2: any;
    chartOptions: any;
    subscription: Subscription;
    config: any;

    public id: number = -1;

    public ngOnInit() {
        this.route.params.subscribe(params => {
            if (+params['id'] > -1) {
              this.id = +params['id']; 
                this.service.getCronogramas(this.id).subscribe( res => {
                    this.data =  res.Detalle._app_lst_cronogramas.lst;
                    this.dataCronogramas =  res.Detalle._app_lst_cronogramas.lst[0].cronogramas;
                    
                    console.log( this.dataCronogramas );
                    
                
                });
            }else{
            
            }
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

    public lstActividad ( id: number ){
        this.router.navigate([ `/ControlPMI/Actividad/${id}`]);
    }

    public lstCronograma ( id: number ){
        this.router.navigate([ `/ControlPMI/Cronograma/${id}`]);
    }
  
}
