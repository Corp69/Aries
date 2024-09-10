// angular 
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// prime ng 
import { ToastModule} from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { MessageService} from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
//--
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

import {DialogModule} from 'primeng/dialog';
//---------------------------------

//servicios
import { CuentasService } from './services/cuentas.service';
//interfaces
import { listados } from '../impuestos/interface/impuesto';



@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [
  
    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
        
    //prime ng 
    ToastModule,
    BlockUIModule,
    CardModule,
    DividerModule,
    MessageModule,
    TableModule,
    DialogModule,
    //--
      InputGroupModule,
      InputGroupAddonModule,
      InputTextModule,
    //--
      DropdownModule,
      ProgressSpinnerModule,
      ButtonModule,
      TooltipModule,
    //--


  ],
  providers: [
  
    MessageService
  ],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.scss'
})
export default class CuentasComponent implements OnInit {
  
  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

  // variables de tabla
  public DataSource: any = [];
  public DataSourceRespaldo: any = null;
  
  public lstCuentas: listados[] = [];
    
  //?=============================
  //Modales
  public CuentaNv1: boolean = false;
  public CuentaNv2: boolean = false;
  
  //id de la cuenta NLV1
  public _id: Number = -1;

  // formulario Cuenta nvl1 
  public frm: FormGroup = this.fb.group({ 
    id: [null], 
    codigo: [, [Validators.required, Validators.minLength(3)]], 
    descripcion: [, [Validators.required, Validators.minLength(3)]], 
  });


  // formulario CUENTA nvl2 
  public frmnlv2: FormGroup = this.fb.group({ 
    id: [null], 
    codigo: [, [Validators.required, Validators.minLength(3)]], 
    descripcion: [, [Validators.required, Validators.minLength(3)]], 
  });

  constructor( 
    private messageService: MessageService, 
    private fb: FormBuilder,
    private servicio: CuentasService
  ){}
  
  
  public ngOnInit(): void {
    /**
     * obtnemos cuentas nivel 1 
     */
    this.servicio.getCuentas().subscribe( resp =>{
      this.lstCuentas = resp.Detalle.fis_sat_cuentas.lst;
    });
  }
  
  /**
   * obtenemos las cuentas del nivel 2
   */
  public getCuentasNv2( id: Number){
  
    this._id = id;

     this.servicio.getTablaCuentas( id ).subscribe( resp =>{
       this.DataSource = resp.Detalle.fis_tabla_sat_cuentas.data;       
       this.DataSourceRespaldo = resp.Detalle.fis_tabla_sat_cuentas.data;       
      });
  }

  public onfilter( filtro: any ){
    if (filtro.value == "") {
      this.DataSource = this.DataSourceRespaldo;
    } else {
      this.DataSource = this.DataSource.filter(item => item.descripcion.toLowerCase().includes(filtro.value.toLowerCase()));
    }
  }


  // eliminar subcuenta 
  public eliminarRow( args: any ){}



  //? ========================================================
  // modificar btn Modificarow
    
  public ModificaNv2( args: any ){
    //seteamos los valores al formulario 
    this.CuentaNv2 = true;
    this.frmnlv2.controls['id'].setValue(args.id);
    this.frmnlv2.controls['codigo'].setValue(args.codigo);
    this.frmnlv2.controls['descripcion'].setValue(args.descripcion);

  }
  
  //modificar la cuenta 
  public ActualizarNV2(){
     this.CuentaNv2 = false;
    //SERVICIO ACTUALIZACION 
    this.servicio.ActualizarNV2(this.frmnlv2.value).subscribe(resp => {
      switch (resp.IdMensj) {
        case 3:
          break;
        case 2:
          // mensaje para verificar la captura de la direccion del sat
          this.messageService.add({key: 'tc', severity:'info', summary: 'warning', detail: 'Cuenta No fue Actualizada.'});
          break;
        default:
            // mensaje para verificar la captura de la direccion del sat
            this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Cuenta Actualizada.'});
            this.servicio.getTablaCuentas(  this._id ).subscribe( resp =>{
              this.DataSource = resp.Detalle.fis_tabla_sat_cuentas.data;       
              this.DataSourceRespaldo = resp.Detalle.fis_tabla_sat_cuentas.data;       
             });  
          break;
      }    
    });
  }
  





  public ModificarCuentaNLV1(){

  }




}
