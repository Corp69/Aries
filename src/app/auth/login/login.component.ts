import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";

import {DividerModule} from 'primeng/divider';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
            DividerModule,
            CommonModule,
            ReactiveFormsModule,
            DialogModule,
            CalendarModule,
            ChipsModule,
            CardModule,
            DropdownModule,
            InputMaskModule,
            InputNumberModule,
            MultiSelectModule,
            CascadeSelectModule,
            InputTextareaModule,
            AutoCompleteModule,
            ConfirmDialogModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export default class LoginComponent implements OnInit {
  
  // ******************************************
  // variable: modales
  public visible:  boolean = false;
  public Titulo:   String  = 'Inicio De Session' 
  public Mensaje:  String  = 'Consulta de manera exitosa !' 
  public Detalle:  String  = 'No existe el Usuario en la base de datos' 

  public myForm: FormGroup = this.fb.group({
    USUARIO: ['', [Validators.required, Validators.minLength(3)]],
    PASSS: [0, [Validators.required, Validators.min(0)]]
  });

  constructor( private fb: FormBuilder ) 
  {

    this.cities = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" }
    ];


  }



  public onSave() {
  
   console.log( this.myForm.value );
  
   /*
    this.servicio.inicioSesion3(this.myForm.value).subscribe(resp => {
      switch (resp.data) {
        case undefined:
          this.Titulo = resp.Ttitulo;
          this.Mensaje = resp.Mensaje;
          this.Detalle = resp.Detalle;
          this.visible = true;
          break;
        default:
          localStorage.setItem('id', resp.data.user.id!);
          localStorage.setItem('Usuario', resp.data.user.usuario!);
          localStorage.setItem('token', resp.data.token!);
          //this.router.navigate(['./Control/inicio']);
          break;
      }
    });
    */
  }


  countries: any[];

  cascadeSelectCountries: any[];

  cities: any[];

  filteredCountries: any[];

  value1: any;

  value2: any;

  value3: any;

  value4: any;

  value5: any;

  value6: any;

  value7: any;

  value8: any;

  value9: any;

  value10: any;

  valueIconLeft: any;

  valueIconRight: any;



  ngOnInit() {

    this.myForm = this.fb.group({
      USUARIO: '',
      PASSS: ''
    });

    this.cascadeSelectCountries = [
      {
        name: "Australia",
        code: "AU",
        states: [
          {
            name: "New South Wales",
            cities: [
              { cname: "Sydney", code: "A-SY" },
              { cname: "Newcastle", code: "A-NE" },
              { cname: "Wollongong", code: "A-WO" }
            ]
          },
          {
            name: "Queensland",
            cities: [
              { cname: "Brisbane", code: "A-BR" },
              { cname: "Townsville", code: "A-TO" }
            ]
          }
        ]
      },
      {
        name: "Canada",
        code: "CA",
        states: [
          {
            name: "Quebec",
            cities: [
              { cname: "Montreal", code: "C-MO" },
              { cname: "Quebec City", code: "C-QU" }
            ]
          },
          {
            name: "Ontario",
            cities: [
              { cname: "Ottawa", code: "C-OT" },
              { cname: "Toronto", code: "C-TO" }
            ]
          }
        ]
      },
      {
        name: "United States",
        code: "US",
        states: [
          {
            name: "California",
            cities: [
              { cname: "Los Angeles", code: "US-LA" },
              { cname: "San Diego", code: "US-SD" },
              { cname: "San Francisco", code: "US-SF" }
            ]
          },
          {
            name: "Florida",
            cities: [
              { cname: "Jacksonville", code: "US-JA" },
              { cname: "Miami", code: "US-MI" },
              { cname: "Tampa", code: "US-TA" },
              { cname: "Orlando", code: "US-OR" }
            ]
          },
          {
            name: "Texas",
            cities: [
              { cname: "Austin", code: "US-AU" },
              { cname: "Dallas", code: "US-DA" },
              { cname: "Houston", code: "US-HO" }
            ]
          }
        ]
      }
    ];
  }

  searchCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }


  


}
