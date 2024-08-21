import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {DialogModule} from 'primeng/dialog';

@Component({
  standalone: true,
  imports: [

    CommonModule, 
    CardModule, 
    ToastModule,
    DividerModule, 
    TooltipModule,
    ButtonModule,
    BlockUIModule,
    DialogModule,
    CarouselModule

], 
providers: [MessageService],
templateUrl: './principal.component.html',
styleUrl: './principal.component.scss',
styles: ``
})
export default class PrincipalComponent implements OnInit {
  
    // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  public displayModal: boolean  = false;
  public products: any = [];

	public responsiveOptions;
  
  public correo: String = "info@ec.com.mx"

    constructor(
        private messageService: MessageService,
    ){}

  public ngOnInit() {
    this.products = [
        {
          "id": "1",
          "name": "MODULO: MEDICO",
          "description": "control medico - paciente recetas.",
          "image": "icon.jpg",
          "price": 1000,
          "category": "Medico",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
        {
          "id": "2",
          "name": "MODULO: Contabilidad",
          "description": "control fiscal - En tu Organizacion",
          "image": "icon.jpg",
          "price": 1000,
          "category": "Fiscal",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
        {
          "id": "3",
          "name": "MODULO: Project Manager",
          "description": "control PMI  - En tu Organizacion",
          "image": "icon.jpg",
          "price": 1000,
          "category": "Organizacional",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
        {
          "id": "4",
          "name": "MODULO: RH",
          "description": "control RH  - En tu Organizacion",
          "image": "icon.jpg",
          "price": 1000,
          "category": "Organizacional",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
        {
          "id": "4",
          "name": "MODULO: Inventarios",
          "description": "control Inventarios - En tu Organizacion",
          "image": "icon.jpg",
          "price": 1000,
          "category": "Organizacional",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
        {
          "id": "6",
          "name": "MODULO: Compras",
          "description": "control Compras - En tu Organizacion",
          "image": "icon.jpg",
          "price": 1000,
          "category": "compras",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
        {
          "id": "7",
          "name": "MODULO: Ventas",
          "description": "control Ventas - En tu Organizacion",
          "image": "icon.jpg",
          "price": 1000,
          "category": "ventas",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
        {
          "id": "8",
          "name": "MODULO: Membresias",
          "description": "control Membresias - En tu Organizacion",
          "image": "icon.jpg",
          "price": 1000,
          "category": "ventas",
          "quantity": 1,
          "inventoryStatus": "Desarrollo",
          "rating": 5
        },
      ]
  }

  //mostrar dialogo
  public showModalDialog() {
    this.displayModal = true;
  }

}
