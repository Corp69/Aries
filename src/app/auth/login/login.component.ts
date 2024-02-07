import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, SidebarModule, ButtonModule  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export default class LoginComponent {


  sidebarVisible: boolean = true;

}
