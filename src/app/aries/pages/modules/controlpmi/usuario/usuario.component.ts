import { AfterViewInit, Component, OnInit } from '@angular/core';
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import {MessageService} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { UserServService } from './Services/userServ.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
  
    CommonModule,
    ToastModule,
    BlockUIModule,
    CardModule,
    TagModule,
    TooltipModule,
    ButtonModule,
    DividerModule
  ],
  providers: [MessageService],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})


export default class UsuarioComponent implements OnInit, AfterViewInit{

  // variables de tabla
  //tabla
  public DataSource: any;


  constructor(
    private servicio: UserServService
  ) { 
    
}
  ngAfterViewInit(): void {
    this.servicio.FisUser().subscribe(resp => { 
    
      this.DataSource       = resp.Detalle._aries_usuario.data; 
    
      console.log(this.DataSource);
        });
  }

  public ngOnInit(): void {
   
  }



  public Editar(){

  }

}


