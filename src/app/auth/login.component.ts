import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [ RouterModule,  SidebarModule, ButtonModule ],
  templateUrl: './login.component.html',
  styles: ``
})

export default class LoginComponent {

  sidebarVisible: boolean = true;

}
