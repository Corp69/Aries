import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-documentoventa',
  standalone: true,
  imports: [    ProgressBarModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    ToastModule],
  templateUrl: './documentoventa.component.html',
  styleUrl: './documentoventa.component.scss'
})
export default class DocumentoventaComponent {

}
