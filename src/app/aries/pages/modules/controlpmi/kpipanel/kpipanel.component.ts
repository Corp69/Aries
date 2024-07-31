import { Component } from '@angular/core';
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-kpipanel',
  standalone: true,
  imports: [
    ToastModule,
    BlockUIModule,
    CardModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './kpipanel.component.html',
  styleUrl: './kpipanel.component.scss'
})


export default class KpipanelComponent {

      // variable que bloquea la vista
      public Ariesblocked: boolean  = false;


public Navegar(){

}

}


