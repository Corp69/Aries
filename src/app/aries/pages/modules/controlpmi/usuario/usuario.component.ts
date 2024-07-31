import { Component } from '@angular/core';
import {ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import {MessageService} from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    ToastModule,
    BlockUIModule,
    CardModule,
    TooltipModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})


export default class UsuarioComponent {

public Editar(){

}

}
