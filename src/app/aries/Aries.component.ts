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
  public SideF: boolean = false;
  public AriesConfig: boolean = false;
  public theme = localStorage.getItem("theme");

  public items3: any;
  public itemsURL: any;

  constructor( private servicio: HomeService, private router: Router) {

  }

 public changeTheme(theme: string) { localStorage.setItem('theme', theme); this.servicio.switchTheme(theme);}


 public navigateToUrl(url: any) { this.router.navigate([url]); this.sidebarVisible = false;}

 ngOnInit() {
    this.servicio.lstOpciones().subscribe(resp => {

      this.items   = resp.Detalle._app_menu_x_empleado;
      let items2   = this.items.map(group => group.menu);
      this.items = items2;
    });
    this.servicio.switchTheme(localStorage.getItem("theme"));
  //cambio de colores
  this.items3 = [
    { label: 'Default', icon: 'pi pi-sun', command: () => {  this.changeTheme('saga-blue');  }},
    { label: 'Azul-Marino', icon: 'pi pi-moon', command: () => {  this.changeTheme('vela-blue');  }},
    { label: 'Azul-noche', icon: 'pi pi-moon', command: () => {  this.changeTheme('arya-blue');  }},
    { label: 'Azul-dia', icon: 'pi pi-sun', command: () => {  this.changeTheme('md-light-indigo');  }},
    { label: 'Negro-noche', icon: 'pi pi-moon',  command: () => {  this.changeTheme('md-dark-indigo');  }},
    { label: 'Morado-dia', icon: 'pi pi-sun', command: () => {  this.changeTheme('bootstrap4-light-purple');  }},
    { label: 'Morado-noche', icon: 'pi pi-moon',  command: () => {  this.changeTheme('bootstrap4-dark-purple');  }},
    { label: 'Verde-noche', icon: 'pi pi-moon',  command: () => {  this.changeTheme('luna-green');  }},
];

  }




  /**
   * 
   */

  
  public ExpandirSide(){
    this.sidebarVisible = false;
    
    

    this.SideF  = true;
  }



  /**
   * VER configuraciones de Aries / Licencias 
   */

  public AriesC(){

    this.AriesConfig = true;
  }

  /**
   * cerrar session
   */
  public CerrraSesion = () =>{
    this.AriesConfig = false;
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}
