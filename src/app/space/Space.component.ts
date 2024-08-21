import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


//servicios 
import { HomeService } from './Services/Home.service';
//shared
import { FirmaComponent } from '@shared/pages/firma/firma.component';
///prime ng 
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule} from 'primeng/button';
import { CardModule} from 'primeng/card';
import { SplitButtonModule} from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';


@Component({
  standalone: true,
  imports: [

    //shared 
    FirmaComponent,
    //Angular
    RouterModule,
    CommonModule,
    //---------------------------->
    //modulos para vista principal
    SidebarModule,
    AccordionModule,
    DividerModule,
    MenubarModule,
    ButtonModule,
    SplitButtonModule,
    CardModule
  ],
  templateUrl: './Space.component.html',
  styles: ``
})
export default class SpaceComponent implements OnInit {

  public sidebarVisible: boolean = false;
  public theme = localStorage.getItem("theme");

  //variable Cambio de colores
  public items3: any;

  constructor(
    private servicio: HomeService, private router: Router) {

  }
 
 public ngOnInit() {

  this.servicio.switchTheme(localStorage.getItem("theme"));
  //cambio de colores
  this.items3 = [
      { label: 'Default', icon: 'pi pi-sun', command: () => {  this.changeTheme('saga-blue');  }},
      { label: 'Azul-Marino', icon: 'pi pi-sun', command: () => {  this.changeTheme('vela-blue');  }},
      { label: 'Azul-noche', icon: 'pi pi-moon', command: () => {  this.changeTheme('arya-blue');  }},
      { label: 'Azul-dia', icon: 'pi pi-sun', command: () => {  this.changeTheme('md-light-indigo');  }},
      { label: 'Negro-noche', icon: 'pi pi-moon',  command: () => {  this.changeTheme('md-dark-indigo');  }},
      { label: 'Morado-dia', icon: 'pi pi-sun', command: () => {  this.changeTheme('bootstrap4-light-purple');  }},
      { label: 'Morado-noche', icon: 'pi pi-moon',  command: () => {  this.changeTheme('bootstrap4-dark-purple');  }},
      { label: 'Verde-noche', icon: 'pi pi-moon',  command: () => {  this.changeTheme('luna-green');  }},
  ];
  }
  
  //navegacion
 public navigateToUrl(url: String) { this.router.navigate([ `space/${url}`]); this.sidebarVisible = false;}
  //cambio de color o paletas de colores
 public changeTheme(theme: string) { localStorage.setItem('theme', theme); this.servicio.switchTheme(theme);}


  /**
   * cerrar session e ir a login
   */
  public CerrraSesion = () =>{
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}
