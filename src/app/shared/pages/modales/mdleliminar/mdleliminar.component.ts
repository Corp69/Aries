import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

//shared
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MdlEliminarService } from './Services/MdlEliminar.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-mdleliminar',
  standalone: true,
  imports: [
    CommonModule ,
    //prime ng
    DialogModule,
    ButtonModule,
    TooltipModule,

  ],
  templateUrl: './mdleliminar.component.html',
  styleUrl: './mdleliminar.component.scss'
})
export class MdleliminarComponent {

  @Input()
  public mdleliminar: boolean = false;

  @Input()
  public _tabla: String = "";

  @Input()
  public _id: number = -1;

  // retorna la busqueda del servicio
  @Output() _rowconfirmacion = new EventEmitter<boolean>();


// constructor
 constructor( private servicio: MdlEliminarService) { }

  //eliminamo
  public OnEliminar(){
    this.servicio.Eliminar( this._tabla, this._id ).subscribe(resp => {
      this._tabla = "";
      this._id    = -1;
      this.mdleliminar = false;
      this._rowconfirmacion.emit(true);
    })
  }

  //cerramos la modal
  public OnCancelar(){
    this._tabla = "";
    this._id    = -1;
    this.mdleliminar = false;
    this._rowconfirmacion.emit( true );
  }

}
