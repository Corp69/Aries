import { Component } from '@angular/core';
//interface
//primeNG 
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'primeng/blockui';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            //angular
            CommonModule,
           //primeng
           ProgressBarModule,
           ProgressSpinnerModule,
           CardModule,
           ButtonModule,
           ToastModule,
          
           BlockUIModule 


          ],
          providers: [MessageService],
  templateUrl: './recupera.component.html',
  styleUrl: './recupera.component.css'
})

export default class RecuperaComponent   {

  public Ariesblocked: boolean = false;

}
