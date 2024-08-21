import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';


@Component({
  standalone: true,
  imports: [

    CommonModule, 
    CardModule, 
    ToastModule,
    DividerModule, 
    TooltipModule,
    ButtonModule,
    BlockUIModule

], 
providers: [MessageService],
templateUrl: './principal.component.html',
styleUrl: './principal.component.scss',
styles: ``
})
export default class PrincipalComponent  {
  
    // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

    constructor(
        private messageService: MessageService,
    ){}



  ngOnInit() {
    
     
      
  }


  public Navegar(){

  }



}
