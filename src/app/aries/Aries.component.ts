import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { HomeService } from './Services/Home.service';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';

import {CardModule} from 'primeng/card';
import { FirmaComponent } from '@shared/pages/firma/firma.component';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import {SplitButtonModule} from 'primeng/splitbutton';

@Component({
  standalone: true,
  imports: [
    FirmaComponent,
    CardModule,
    RouterModule,
    CommonModule,
    //------ navbar
    AvatarModule,
    BadgeModule,
    AvatarGroupModule,
    //---------------------------->
    //modulos para vista principal
    SidebarModule,
    AccordionModule,
    DividerModule,
    MenubarModule,
    ButtonModule,
    SplitButtonModule
  ],
  templateUrl: './Aries.component.html',
  styles: ``
})
export default class AriesComponent {


  public items:   any | undefined;
  public sidebarVisible: boolean = false;
  public theme = localStorage.getItem("theme");

  public items3: any;
  public itemsURL: any;

  constructor( private servicio: HomeService, private router: Router) {

  }

 public changeTheme(theme: string) { localStorage.setItem('theme', theme); this.servicio.switchTheme(theme);}


 public navigateToUrl(url: any) { this.router.navigate([url]);}

 ngOnInit() {
    this.servicio.lstOpciones().subscribe(resp => {

      this.items   = resp.Detalle._app_menu_x_empleado;
      let items2   = this.items.map(group => group.menu);
      this.items = items2;
    });
    this.servicio.switchTheme(localStorage.getItem("theme"));

  //cambio de colores
  this.items3 = [
      { label: 'saga-blue', icon: 'pi pi-arrow-right-arrow-left', command: () => {  this.changeTheme('saga-blue');  }},
      { label: 'vela-blue', icon: 'pi pi-arrow-right-arrow-left', command: () => {  this.changeTheme('vela-blue');  }},
      { label: 'arya-blue', icon: 'pi pi-arrow-right-arrow-left', command: () => {  this.changeTheme('arya-blue');  }},
      { label: 'md-light-indigo', icon: 'pi pi-arrow-right-arrow-left', command: () => {  this.changeTheme('md-light-indigo');  }},
      { label: 'md-dark-indigo', icon: 'pi pi-arrow-right-arrow-left',  command: () => {  this.changeTheme('md-dark-indigo');  }},
      { label: 'bootstrap4-light-purple', icon: 'pi pi-arrow-right-arrow-left', command: () => {  this.changeTheme('bootstrap4-light-purple');  }},
      { label: 'bootstrap4-dark-purple', icon: 'pi pi-arrow-right-arrow-left',  command: () => {  this.changeTheme('bootstrap4-dark-purple');  }},
      { label: 'luna-green', icon: 'pi pi-arrow-right-arrow-left',  command: () => {  this.changeTheme('luna-green');  }},
  ];

  this.itemsURL = [
    {label:'Categories'},
    {label:'Sports'},
    {label:'Football'},
    {label:'Countries'},
    {label:'Spain'},
    {label:'F.C. Barcelona'},
    {label:'Squad'},
    {label:'Lionel Messi',}
];

  }


  /**
   * cerrar session
   */
  public CerrraSesion = () =>{
    localStorage.clear();
    debugger;
    this.router.navigate(['/auth/login']);
  }


}
