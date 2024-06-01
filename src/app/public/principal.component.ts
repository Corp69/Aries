import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { HomeService } from './services/Home.service';
import { FirmaComponent } from '@shared/public/factura/firma/firma.component';

@Component({
  standalone: true,
  imports: [ 
    
    FirmaComponent,

    //prime ng
    //---------------------------->
    //modulos para vista principal
    SidebarModule,
    AccordionModule,
    DividerModule,
    MenubarModule,
    ButtonModule,
    SplitButtonModule,


    CommonModule,
    RouterModule 
  
  ],
  templateUrl: './principal.component.html',
  styles: ``
})

export default class PrincipalComponent {

  public items:   any | undefined;
  public sidebarVisible: boolean = false;
  public theme = localStorage.getItem("theme");

  public items3: any ;

  constructor( 
     private servicio: HomeService, 
    private router: Router) {

  }

  public changeTheme(theme: string) { localStorage.setItem('theme', theme); 
   this.servicio.switchTheme(theme);

  }


 public navigateToUrl(url: any) { this.router.navigate([url]);}

 ngOnInit() {


  console.log( " hola ");


    // this.servicio.lstOpciones().subscribe(resp => {

    //   this.items   = resp.Detalle._app_menu_x_empleado;
    //   let items2   = this.items.map(group => group.menu);
    //   this.items   = items2;
    // });

    this.items = [];
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
  ];

  }


  /**
   * cerrar session
   */
  public CerrraSesion = () =>{
    localStorage.clear();
    debugger;
    // this.router.navigate(['/auth/login']);
  }


}
