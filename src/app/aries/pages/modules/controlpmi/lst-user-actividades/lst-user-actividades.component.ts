
import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';


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
    ProgressBarModule
  


  ],
  templateUrl: './lst-user-actividades.component.html',
  styleUrl: './lst-user-actividades.component.scss'
})
export default class LstUserActividadesComponent implements OnInit {
  
  public data: any = [];
  
  public tipo : String = "doughnut";
  

 constructor(
  private service: UsuarioService,
  private router: Router
 ){}
  
  
  public id: number = -1;

  public ngOnInit() 
  {
      this.service.getProyectos().subscribe( res => { this.data  =  res.Detalle._app_lst_proyectos.lst;});
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
