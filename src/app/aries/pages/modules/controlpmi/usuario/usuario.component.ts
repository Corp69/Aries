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
import { UsuarioService } from './Services/Usuario.service';

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


export default class UsuarioComponent implements OnInit{

  ///data 
  public data: any = [];
   
  public nombre: String = " riuchiar"


  constructor( 
    private servicio: UsuarioService
  ){}
 
 
  public ngOnInit(): void {
    this.servicio.getUser().subscribe((resp) => { 
      
      this.data    = resp.Detalle._aries_usuario.data; 
      console.log( this.data );
      
    });


}




}


