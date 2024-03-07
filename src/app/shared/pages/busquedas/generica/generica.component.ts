import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericoService } from './services/generico.service';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-generica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    TableModule,
    MessageModule
  ],
  templateUrl: './generica.component.html',
  styleUrl: './generica.component.scss'
})
export class GenericaComponent {

  
  public frmSat: FormGroup = this.fb.group({ descripcion: [, [Validators.required, Validators.minLength(3)]] });
  //tabla   
  public DataSource: any;
  public DataSourceColumnas: any;
  //=================================================================================================================
  // variables entre componentes
  @Input()
  public tabla: String = '';
  @Output() JsonSat = new EventEmitter<any>();

  //=================================================================================================================

  constructor(
    private fb: FormBuilder,
    private servicio: GenericoService
    //private datePipe: DatePipe,
  ) { }
  //
  public buscarinfo = () => {
    //=======================================================================================
    this.servicio.BuscarSatClaveprodServicio(this.tabla, this.frmSat.value.descripcion).subscribe(resp => {
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
          this.frmSat.setValue(this.frmSat.value);
          break;
        //=======================================================================================

      }
    });
  }
  //==============================================================================================================
  // funcionalidad de la tabla:
  public onSelectionChange(args: any) {
    this.JsonSat.emit(args[0]);
    this.DataSource = null;
    this.frmSat.controls['descripcion'].setValue('');
  }
  /**
   * 
   * @param obj pasamos el json del DataSource => solo obtenemos el valor del atributo eliminando el key del Json. 
   * @returns => retorna valor del atributo sin el key. 
   */
  public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }

  public onSelectAllChange(args: any) {
    this.JsonSat = args;
  }

}
