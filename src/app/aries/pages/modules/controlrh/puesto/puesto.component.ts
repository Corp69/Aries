import { Component } from '@angular/core';

import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PuestoService } from './Services/Puesto.service';
import { listados } from './interface/puesto';

@Component({
  selector: 'app-puesto',
  standalone: true,
  imports: [

    ProgressBarModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    ToastModule,
    BlockUIModule,
    DividerModule,
    MessageModule,
    DropdownModule,
    InputGroupModule,
    InputGroupAddonModule

  ],
  providers: [MessageService],
  templateUrl: './puesto.component.html',
  styleUrl: './puesto.component.scss'
  
})
export default class PuestoComponent {

  // Listados:
  public listPuesto_riesgo: listados[] = [];
  public lstdepartamento:   listados[] = [];
  
  //id Puesto:
  public _id: number = -1;

   // variable que bloquea la vista
   public Ariesblocked: boolean  = false;

   //Formularios del app:
  public frmPuesto: FormGroup = this.fb.group({
    id:     [-1],
    descripcion: [],
    puesto_unico: [ null ],
    costo: [ null ],
    codigo: [],
    encargado: [],
    activo: [],
    
    id_rh_puesto_riesgo: [null],
    id_rh_departamento: [ null],
  
  });


   constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private servicio: PuestoService,
    private messageService: MessageService )
    {}
    
     /**
   * cargamos la data del proveedor una vez cargado todo los componentes
   */

      // una vez carga el componente
  ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.listPuesto_riesgo().subscribe(resp => { this.listPuesto_riesgo  = resp.Detalle; });
    this.servicio.lstdepartamento().subscribe(resp =>    { this.lstdepartamento    = resp.Detalle; });
  }


  public ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        //agregamos valor del id persona
        this._id = +params['id'];
        // AGREGAMOS LA INFORMACION AL FORMULARIO
        this.servicio.Datainfo(+params['id']).subscribe(resp => {
         //this.frmPuesto.setValue(resp.Detalle);
         // seteamos la informacion
         this.frmPuesto.controls['id'].setValue(resp.Detalle.id);
         this.frmPuesto.controls['descripcion'].setValue(resp.Detalle.descripcion);
         this.frmPuesto.controls['puesto_unico'].setValue(resp.Detalle.puesto_unico);
         this.frmPuesto.controls['costo'].setValue(resp.Detalle.costo);
         this.frmPuesto.controls['codigo'].setValue(resp.Detalle.codigo);
         this.frmPuesto.controls['encargado'].setValue(resp.Detalle.encargado);
         this.frmPuesto.controls['activo'].setValue(resp.Detalle.activo);
         // asignamos el valor String debido a que no es int los parsearemos a String
         this.frmPuesto.controls['id_rh_puesto_riesgo'].setValue(resp.Detalle.id_rh_puesto_riesgo.toString());
         this.frmPuesto.controls['id_rh_departamento'].setValue(resp.Detalle.id_rh_departamento);
        });
      }
    });
  }


}
