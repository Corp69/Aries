import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// modelos
import { MdlEmpleado } from './models/MdlEmpleado';
// shared
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
// servicios
import { EmpleadoService } from './Services/Empleado.service';
//Interface
import { ConfirmacionMensaje, listados } from './interface/empleado';
// prime NG
import { DividerModule } from 'primeng/divider';
import { MessagesModule} from 'primeng/messages';
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
import { ToastModule } from 'primeng/toast';
//proveedors prime ng 
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //shared
    GenericaComponent,
    CargaComponent,
    ConfirmacionComponent,
    NombresComponent,
    //prime NG
    KeyFilterModule,
    InputGroupModule,
    InputGroupAddonModule,
    DividerModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    RippleModule,
    BlockUIModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.scss'
})
export default class EmpleadoComponent implements OnInit, AfterViewInit  {
  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: '', mensaje: '', detalle: '' };

  //==============================================================================================================
  // Modal: mensaje bc-nombreMdl falso para no mostrar la modal true para mostrar
  public bcNombreMdl: boolean = false;
  // variables para enviar a modal enviar y realizar busqueda
  public bcnombreDataMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: '', mensaje: '', detalle: '' };

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  //=============================================================================================================
  // satMDL
  public tabalaSat1: String = 'sat_usocfdi';
  public usoCFDI = ''

  public tabalaSat2: String = 'sat_regimenfiscal';
  public RegimenCFDI = ''

  //==============================================================================================================
  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;

  public tablaSat3: String = 'sat_doc_cobro';
  public SatCobroCFDI = ''
  //==============================================================================================================
  // Listados:
  public lstestatus: listados[] = [];
  public listSexo:   listados[] = [];

  //public lstProveedorClasificacion: any;
  //  public lstProovedorOperacion: any;
  //==============================================================================================================
  //modelos:
  public MdlEmpleado: MdlEmpleado = new MdlEmpleado();
  //id empleado:
  public _id: number = -1;

  //==============================================================================================================
  //Formularios del app:
  public frmEmpleado: FormGroup = this.fb.group({
    id:     [-1],
    nombre: [, [Validators.required, Validators.minLength(3)]],
    apellidop: [ null ],
    apellidom: [ null ],
    codigo: [],
    correo: [],
    nss: [, [Validators.required, Validators.minLength(3)]],
    rfc:    [, [Validators.required, Validators.minLength(3)]],
    curp:   [, [Validators.required, Validators.minLength(3)]],
    cuenta_banco: [ null ],
    clabe: [null ],
    whatsapp: [null ],
    observaciones: [null ],
    id_estatus: [null],
    id_sat_usocfdi: [ null],
    //id_sat_doc_cobro:           [1],
    id_sat_regimenfiscal: [null],
    fecha_nacimiento: [ null ],
    fecha_ingreso: [ null ],
    id_sexo: [ null ]
  });

  /**
   *
   * @param route
   * @param fb
   * @param servicio
   *
    //private datePipe: DatePipe,
   *
   */
  constructor( 
       private router: Router,
       private route: ActivatedRoute,
       private fb: FormBuilder, 
       private servicio: EmpleadoService,
       private messageService: MessageService ) {}

  // una vez carga el componente
  ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.listEstatus().subscribe(resp => { this.lstestatus  = resp.Detalle; });
    this.servicio.listSexo().subscribe(resp =>    { this.listSexo    = resp.Detalle; });
  }

  /**
   * cargamos la data del proveedor una vez cargado todo los componentes
   */
  public ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        //agregamos valor del id persona
        this._id = +params['id'];
        // AGREGAMOS LA INFORMACION AL FORMULARIO
        this.servicio.Datainfo(+params['id']).subscribe(resp => {
         //this.frmEmpleado.setValue(resp.Detalle);
         // seteamos la informacion
         this.frmEmpleado.controls['id'].setValue(resp.Detalle.id);
         this.frmEmpleado.controls['nombre'].setValue(resp.Detalle.nombre);
         this.frmEmpleado.controls['apellidop'].setValue(resp.Detalle.apellidop);
         this.frmEmpleado.controls['apellidom'].setValue(resp.Detalle.apellidom);
         this.frmEmpleado.controls['rfc'].setValue(resp.Detalle.rfc);
         this.frmEmpleado.controls['codigo'].setValue(resp.Detalle.codigo);
         this.frmEmpleado.controls['curp'].setValue(resp.Detalle.curp);
         this.frmEmpleado.controls['correo'].setValue(resp.Detalle.correo);
         this.frmEmpleado.controls['cuenta_banco'].setValue(resp.Detalle.cuenta_banco);
         this.frmEmpleado.controls['clabe'].setValue(resp.Detalle.clabe);
         this.frmEmpleado.controls['whatsapp'].setValue(resp.Detalle.whatsapp);
         this.frmEmpleado.controls['observaciones'].setValue(resp.Detalle.observaciones);
         this.frmEmpleado.controls['nss'].setValue(resp.Detalle.nss);
         // asignamos el valor String debido a que no es int los parsearemos a String
         this.frmEmpleado.controls['id_estatus'].setValue(resp.Detalle.id_estatus.toString());
         this.frmEmpleado.controls['fecha_nacimiento'].setValue(resp.Detalle.fecha_nacimiento);
         this.frmEmpleado.controls['fecha_ingreso'].setValue(resp.Detalle.fecha_ingreso);
         this.frmEmpleado.controls['id_sexo'].setValue(resp.Detalle.id_estatus.toString());

        });
        //CARGAMOS CFDI
        this.servicio.Datacfdi(+params['id']).subscribe(resp => {
          // rellenamos los campos de CFDI EN UNA CONSULTA APARTE
          this.frmEmpleado.controls['id_sat_regimenfiscal'].setValue(parseInt(resp.Detalle._app_empleadocfdi.id_sat_regimenfiscal !== null ? resp.Detalle._app_empleadocfdi.id_sat_regimenfiscal : null));
          this.frmEmpleado.controls['id_sat_regimenfiscal'].setValue(parseInt(resp.Detalle._app_empleadocfdi.id_sat_usocfdi !== null ? resp.Detalle._app_empleadocfdi.id_sat_usocfdi : null));
          this.usoCFDI = resp.Detalle._app_empleadocfdi.usocfdi;
          this.RegimenCFDI = resp.Detalle._app_empleadocfdi.regimen;
        });
      }
    });
  }


  //==============================================================================================================
  // Crud Para Proveedores:
  public Almacenar = () => {
    // ?=========================================================================
    this.frmEmpleado.controls['id_estatus'].setValue(parseInt(this.frmEmpleado.value.id_estatus !== null ? this.frmEmpleado.value.id_estatus : 1 ));
    this.frmEmpleado.controls['id_sexo'].setValue(parseInt(this.frmEmpleado.value.id_sexo !== null ? this.frmEmpleado.value.id_sexo : 1 ));
    //validamos que no este el mensaje en pantalla
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    //===============================
    this.servicio.Almacenar(this.frmEmpleado.value).subscribe(resp => {
      switch (resp.IdMensj) {
        case 3:
          //============================================================
          this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
          this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
          this.ConfirmacionMsjMdl.detalle = resp.Solucion;
          this.ConfirmacionMdl = true;
          // desbloqueamos la pantalla
          this.Ariesblocked = false;
          break;
        case 2:
          //============================================================
          this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
          this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
          this.ConfirmacionMsjMdl.detalle = resp.Detalle;
           // mostramos el resultado de la informacion
           this.ConfirmacionMdl  = true;
          // desbloqueamos la pantalla
          this.Ariesblocked = false;
          break;
        default:
          //============================================================
          this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
          this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
          this.ConfirmacionMsjMdl.detalle = resp.Detalle;
          //============================================================
          // instanciamos elmismo formulario para actualizar
          this.frmEmpleado.setValue(this.frmEmpleado.value);
          // agregamos el ID para generar la actualizacion
          this.frmEmpleado.controls['id'].setValue(parseInt(resp.Id));
          // mostramos el resultado de la informacion
          this.ConfirmacionMdl  = true;
          // desbloqueamos la pantalla
          this.Ariesblocked     = false;
          break;
      }
      this.BtnSpinner = false;
    });
  }

  // metodo para agregar un nuevo proveedor
  public NuevoEmpleado = () => {
    // reiniciamos el formulario
    this.frmEmpleado.setValue(this.MdlEmpleado);
    // prime trabaja con String lo pasamos a String el valor numerico
    this.frmEmpleado.controls['id_estatus'].setValue("1");
    this.frmEmpleado.controls['id_estatus'].setValue("1");
    // solo reiniciamos las variables visuales
    this.usoCFDI = "";
    this.RegimenCFDI = "";
    // mensaje para decir que esta OK el formulario
    this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del empleado y guarde su información.'});

  }

  public Domicilios = () => {
    switch (this._id) {
     case -1:
      this.messageService.add({key: 'tc', severity:'warn', summary: 'Warn', detail: 'No hay un proveedor, seleccionado.'});
       break;
     default:
       this.router.navigate([ `/ControlRh/Domicilio/${this._id}`]);
       break;
    }
   }

   public dlgBuscar = () => {
    this.router.navigate([ `/ControlRh/Empleados`]);
   }

  //==============================================================================================================
  //Modales:
  public visible: boolean = false;
  public dlgRegimenvisible: boolean = false;
  public dlgDocCbrovisible: boolean = false;
  //==============================================================================================================
  public showDialog =  () => { this.visible = true; }
  public dlgRegimen =  () => { this.dlgRegimenvisible = true; }
  public dlgDocCbro =  () => { this.dlgDocCbrovisible = true; }
  public closeDialog = () => { this.visible = false; }
  //==============================================================================================================
  public SatUsoCfedi(jsonSatUsoCFDI: any) {
    this.usoCFDI = jsonSatUsoCFDI.descripcion;
    this.frmEmpleado.controls['id_sat_usocfdi'].setValue(parseInt(jsonSatUsoCFDI.id));
    this.visible = false;
  }
  //==============================================================================================================
  public SatRegimen(jsonRegimenCFDI: any) {
    
    
    this.RegimenCFDI = jsonRegimenCFDI.descripcion;
    this.frmEmpleado.controls['id_sat_regimenfiscal'].setValue(parseInt(jsonRegimenCFDI.id));
    this.dlgRegimenvisible = false;
  }
  //==============================================================================================================
  public SatCobro(jsonSatCobroCFDI: any) {
    this.SatCobroCFDI = jsonSatCobroCFDI.descripcion;
    this.frmEmpleado.controls['id_sat_doc_cobro'].setValue(parseInt(jsonSatCobroCFDI.id));
    this.dlgDocCbrovisible = false;
  }



}
