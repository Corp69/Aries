import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// shared
import { MdleliminarComponent } from '@shared/pages/modales/mdleliminar/mdleliminar.component';

//prime ng
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonModule } from '@angular/common';
import { TablaDomicilioService } from './services/Tabladomicilio.service';
import { BlockUIModule } from 'primeng/blockui';


@Component({
  selector: 'aries-tabla-domicilios',
  standalone: true,
  imports: [
    //shared
    MdleliminarComponent,
    //angular
    CommonModule,
    // prime ng
    DividerModule,
    TableModule,
    MessageModule,
    CardModule,
    ButtonModule,
    BlockUIModule,
    KeyFilterModule
  ],
  templateUrl: './domicilios.component.html',
  styleUrl: './domicilios.component.scss'
})
export  default class TabalaDomiciliosComponent implements OnInit  {

 // variable que bloquea la vista
 public Ariesblocked: boolean  = false;

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public mdleliminar: boolean = false;
  // variables entre componentes
  @Input()
  public _tabla: String = "";
  public _id:    number = -1;

   // retorna la busqueda del servicio
   @Output() _frm = new EventEmitter<any>();


 //tabla
 public DataSource: any;
 public DataSourceColumnas: any;

 // constructor
 constructor(private servicio: TablaDomicilioService,  private route: ActivatedRoute ){ }

  ngOnInit(): void {
    console.log(" tabla => " , this._tabla);
    console.log(" tabla id => " , this._id);
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        this._id = +params['id'];
        console.log(" tabla id => " , this._id);
        this.servicio.Buscar( this._tabla, this._id ).subscribe(resp => {
          console.log("respuesta de la tabla", resp.Detalle._proveedor_domicilio._domicilio );
          this.DataSource = resp.Detalle._proveedor_domicilio._domicilio;
          this.DataSourceColumnas = Object.keys(this.DataSource[0]);
        });
      }
      else{
        this.DataSource = [];
        this.DataSourceColumnas = [];
      }
    });
  }


public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }

public  ModificarRow( args: any ){
  this._frm.emit( args );
}

public eliminarRow( args: any ){
  console.log( args );
  this._id = args.id;
  this.mdleliminar = true;
  this.Ariesblocked = true;
}

//==============================================================================================================
// metodo generico de busqueda...
public eliminacion( response: any) {
    console.log( response );
    // cargamos al objeto a buscar
  this.mdleliminar  = false;
  this.Ariesblocked = false;
}

}
