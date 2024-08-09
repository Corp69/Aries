import { Component } from '@angular/core';
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule} from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessageModule} from 'primeng/message';
import { TooltipModule} from 'primeng/tooltip';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-contadocumento',
  standalone: true,
  imports: [ 

    InputGroupModule,
    InputGroupAddonModule,
    BlockUIModule,
    CardModule,
    ToastModule,
    DividerModule,
    MessageModule,
    TooltipModule,
    ProgressSpinnerModule,
    ButtonModule,
    DropdownModule
   ],
  
  templateUrl: './contadocumento.component.html',
  styleUrl: './contadocumento.component.scss'
})
export default class ContadocumentoComponent {

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

}
