import { Component } from '@angular/core';
//interface
//primeNG 
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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



          ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export default class IndexComponent   {


  constructor( private router: Router ){}



  public irDescarga = () => {
    this.router.navigate(['/publico/descarga']);
    
  }
  public irNueva = () => {

    this.router.navigate(['/publico/nueva']);

  }
  public irRecuperaPDF = () => {

    this.router.navigate(['/publico/recuperapdf']);

  }

}
