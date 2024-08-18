import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
  
      //angular
      CommonModule,
      //primeng
      ProgressBarModule,
      ProgressSpinnerModule,
      CardModule,
      ButtonModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export default class IndexComponent {
  
  constructor( private router: Router ){}

  public irNueva = () => {
    this.router.navigate(['/consultorio/cita']);
  }


}
