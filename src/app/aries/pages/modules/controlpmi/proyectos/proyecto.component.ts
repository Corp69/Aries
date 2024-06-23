import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// prime NG
import { DividerModule } from 'primeng/divider';
import { MessageModule} from 'primeng/message';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { CardModule} from 'primeng/card';
import { DialogModule} from 'primeng/dialog';
import { TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { GenericaComponent } from '@shared/pages/busquedas/generica/generica.component';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ProyectoService } from './Services/proyecto.service';
import { MdlProyecto } from './models/MdlProyecto';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [

    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

        //prime NG
        KeyFilterModule,
        InputGroupModule,
        InputGroupAddonModule,
        DividerModule,
        MessageModule,
        DropdownModule,
        CardModule,
        ProgressSpinnerModule,
        DialogModule,
        TooltipModule,
        ButtonModule,
        RippleModule,
        BlockUIModule,
        DividerModule,
        ToastModule,

  ],
  providers: [
    MessageService
  ],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss'
})
export default class ProyectoComponent {
  //==============================================================================================================
  //modelos:
  //public MdlProyecto: MdlProyecto = new MdlProyecto();
 
   // variable que bloquea la vista
   public Ariesblocked: boolean  = false;
  
   // bloqueamos el boton
  BtnSpinner: boolean  = false;
  
  //==============================================================================================================
  //Formularios del app:
  public frm: FormGroup = this.fb.group({
    id:     [-1],
    nombre: [, [Validators.required, Validators.minLength(3)]],
    codigo: [],
    correo: [],
    rfc:    [, [Validators.required, Validators.minLength(3)]],
    curp:   [],
    id_estatus: [null],
    id_tipo:    [null],
    id_rh_empleado: [parseInt(localStorage.getItem("id"))],
    id_sat_usocfdi: [1],
    //id_sat_doc_cobro:           [1],
    id_sat_regimenfiscal: [1],
    imagen: [null]
  });


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private servicio: ProyectoService )
    {}


    public Nuevo(){

    }
   
    public Almacenar(){

    }

    public lst(){

    }

}
