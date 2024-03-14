import { Component } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
//shared


@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [  
     // angular
     CommonModule,
     ReactiveFormsModule,
    // shared
    NombresComponent

    ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export default class ProveedoresComponent {

 

}
