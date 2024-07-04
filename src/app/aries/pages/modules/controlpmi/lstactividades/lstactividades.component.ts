import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-lstactividades',
  standalone: true,
  imports: [

     //prime 
     CardModule,
  ],
  templateUrl: './lstactividades.component.html',
  styleUrl: './lstactividades.component.scss'
})
export default class LstactividadesComponent {

}
