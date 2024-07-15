
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


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

@Component({
  selector: 'app-lst-user-actividades',
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
    ToastModule,
    BlockUIModule,
    ProgressBarModule


  ],
  providers: [
    MessageService
  ],
  templateUrl: './lst-user-actividades.component.html',
  styleUrl: './lst-user-actividades.component.scss'
})
export default class LstUserActividadesComponent implements OnInit {
  
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
  
  
  public id: number = -1;

  public ngOnInit() 
  {
    this.service.lstActividades().subscribe( res => { 
    
        console.log( res.Detalle._app_lst_actividades_empledado.lst[0] );
        
        this.data         =  res.Detalle._app_lst_actividades_empledado.lst[0];

        
    
    });
  
  
  
    }

  public lstActividad ( id: number ){
      this.router.navigate([ `/ControlPMI/lstCronograma/${id}`]);
  }



    
    public config(){
        this.router.navigate([ `/ControlPMI/Cronograma/-1`]);
    }

    public BtnBuscar(){
        this.router.navigate([ `/ControlPMI/buscarCronograma`]);
    }

    public Nuevo(){
        this.router.navigate([ `/ControlPMI/Cronograma/-1`]);
    }



}
