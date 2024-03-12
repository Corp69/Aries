import { Component } from '@angular/core';

import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [  ProgressBarModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    ToastModule],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export default class AlmacenComponent {

}
