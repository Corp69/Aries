import { Component } from '@angular/core';


//prime ng
//prime
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonModule } from '@angular/common';
import { TablaDomicilioService } from './services/Tabladomicilio.service';

@Component({
  selector: 'aries-tabla-domicilios',
  standalone: true,
  imports: [

    //angular
    CommonModule,

    // prime ng
    DividerModule,
    TableModule,
    MessageModule,
    CardModule,
    ButtonModule,
    KeyFilterModule

  ],
  templateUrl: './domicilios.component.html',
  styleUrl: './domicilios.component.scss'
})
export  default class TabalaDomiciliosComponent {

   //tabla
 public DataSource: any;
 public DataSourceColumnas: any;

 // constructor
 constructor(  private servicio: TablaDomicilioService) { }

  //metodo que realiza la busqueda
  public buscarinfo = () => {
    //=======================================================================================
    this.servicio.Buscar().subscribe(resp => {
      switch (resp.Detalle.length) {
        //=======================================================================================
        case 0:
          this.DataSource = [];
          this.DataSourceColumnas = [];
          break;
        //=======================================================================================
        case null:
          this.DataSource = [];
          this.DataSourceColumnas = [];
          break;
        //=======================================================================================
        case undefined:
          this.DataSource = [];
          this.DataSourceColumnas = [];
          break;
        //=======================================================================================
        default:
          this.DataSource = resp.Detalle;
          this.DataSourceColumnas = Object.keys(this.DataSource[0]);
          break;
        //=======================================================================================
      }
    });
  }





  //==============================================================================================================
 // funcionalidad de la tabla:
 public onSelectionChange(args: any) {

}

/**
 *
 * @param obj pasamos el json del DataSource => solo obtenemos el valor del atributo eliminando el key del Json.
 * @returns => retorna valor del atributo sin el key.
 */
public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }

public onSelectAllChange(args: any) {


}


}
