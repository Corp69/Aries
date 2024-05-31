import { Component } from '@angular/core';
//interface
//primeNG 
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';


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
           ToastModule
          ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})

export default class LoginComponent   {


}
