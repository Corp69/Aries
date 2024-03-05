import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { HomeService } from './Services/Home.service';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';

@Component({
  standalone: true,
  imports: [ 
    RouterModule,
    CommonModule,
    //---------------------------->
    //modulos para vista principal
    SidebarModule,
    AccordionModule,
    DividerModule,
    MenubarModule,
    ButtonModule
  ],
  templateUrl: './Aries.component.html',
  styles: ``
})
export default class AriesComponent {


  public items:   any | undefined;
  public sidebarVisible: boolean = false;
  public theme = localStorage.getItem("theme");
 
  constructor( private servicio: HomeService, private router: Router) {
    
  }

 public changeTheme(theme: string) { localStorage.setItem('theme', theme); this.servicio.switchTheme(theme);}

 
 public navigateToUrl(url: any) { this.router.navigate([url]);}

 ngOnInit() {
    this.servicio.lstOpciones().subscribe(resp => {
      this.items   = resp.Detalle._app_menu_modulo;
      let items2   = this.items.map(group => group.menu); 
      this.items = items2;
    });
    this.servicio.switchTheme(localStorage.getItem("theme"));
  }

}
