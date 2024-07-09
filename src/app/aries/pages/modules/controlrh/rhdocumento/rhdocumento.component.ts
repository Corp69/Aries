import { Component } from '@angular/core';

import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rhdocumento',
  standalone: true,
  imports: [

    ProgressBarModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    ToastModule

  ],
  providers: [MessageService],
  templateUrl: './rhdocumento.component.html',
  styleUrl: './rhdocumento.component.scss'
})
export default class RhdocumentoComponent {

   // variable que bloquea la vista
   public Ariesblocked: boolean  = false;

   constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService )
    {}
}
