import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// modelos
import { MdlCliente } from './models/MdlCliente';
// shared 
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
// servicios 
import { ClienteService } from './Services/Cliente.service';
//Interface
import { ConfirmacionMensaje, listados } from './interface/cliente';
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
import {CalendarModule} from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-cliente',
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
    InputTextareaModule,
    InputTextModule,
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
    CalendarModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})


export default class ClienteComponent implements OnInit, AfterViewInit  {
  // variable para ver el id del cliente
  public _id: number = -1;
  
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
  public usoCFDI = '';

  public tabalaSat2: String = 'sat_regimenfiscal';
  public RegimenCFDI = '';

  //==============================================================================================================
  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;

  public tablaSat3: String = 'sat_doc_cobro';
  public SatCobroCFDI = '';
  //==============================================================================================================
  // Listados:
  public lstestatus:        listados[] = [];
  public listTipo:          listados[] = [];
  public lisMoneda:         listados[] = [];
    
  //public lstProveedorClasificacion: any;
  //  public lstProovedorOperacion: any;
  //==============================================================================================================
  //modelos:
  public MdlCliente: MdlCliente = new MdlCliente();

  //==============================================================================================================
  //Formularios del app:
  public frmCliente: FormGroup = this.fb.group({
    id:     [-1],
    nombre: [null, [Validators.required, Validators.minLength(3)]],
    rfc:    [null, [Validators.required, Validators.minLength(3)]],
    curp:   [null],
    codigo: [null],
    correo: [null],
    fecharegistro: [ new Date()],
    
    id_moneda: [ null, [Validators.required, Validators.min(0)]],
    id_rh_empleado: [null],
    id_sat_usocfdi: [null],
    id_sat_regimenfiscal: [null],
    id_estatus: [null],
    id_tipo:    [null]
    //id_sat_doc_cobro:           [1],
  });

  constructor( 
    private router: Router,
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private servicio: ClienteService, 
    private messageService: MessageService 
  
  ) {}

  // una vez carga el componente
  public ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.listEstatus().subscribe(resp => { this.lstestatus   = resp.Detalle; });
    this.servicio.listTipo().subscribe(resp    => { this.listTipo     = resp.Detalle; });
    this.servicio.listMoneda().subscribe(resp  => { this.lisMoneda    = resp.Detalle; });
  }

  /**
   * cargamos la data del proveedor una vez cargado todo los componentes
   */
  public ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        //cargamos el id de cliente
        this._id = +params['id'];
        // AGREGAMOS LA INFORMACION AL FORMULARIO
        this.servicio.Datainfo(+params['id']).subscribe(resp => {
         //this.frmCliente.setValue(resp.Detalle);
         // seteamos la informacion
         this.frmCliente.controls['id'].setValue(resp.Detalle.id);
         this.frmCliente.controls['nombre'].setValue(resp.Detalle.nombre);
         this.frmCliente.controls['rfc'].setValue(resp.Detalle.rfc);
         this.frmCliente.controls['codigo'].setValue(resp.Detalle.codigo);
         this.frmCliente.controls['curp'].setValue(resp.Detalle.curp);
         this.frmCliente.controls['correo'].setValue(resp.Detalle.correo);
         // asignamos el valor String debido a que no es int los parsearemos a String 
         this.frmCliente.controls['id_estatus'].setValue(resp.Detalle.id_estatus.toString());
         this.frmCliente.controls['id_tipo'].setValue(resp.Detalle.id_tipo.toString());
         this.frmCliente.controls['id_rh_empleado'].setValue(parseInt(resp.Detalle.id_rh_cliente));
         this.frmCliente.controls['fecharegistro'].setValue(resp.Detalle.fecharegistro.toString());
         this.frmCliente.controls['id_sat_regimenfiscal'].setValue(resp.Detalle.id_sat_regimenfiscal !== null ? resp.Detalle.id_sat_regimenfiscal : null);
         this.frmCliente.controls['id_sat_usocfdi'].setValue( resp.Detalle.id_sat_usocfdi !== null ? resp.Detalle.id_sat_usocfdi : null );
         this.frmCliente.controls['id_moneda'].setValue(  resp.Detalle.id_moneda !== null ? resp.Detalle.id_moneda.toString() : null );
        });
        //CARGAMOS CFDI
        this.servicio.Datacfdi(+params['id']).subscribe(resp => {
          switch ( resp.Detalle._app_cliente_cfdi ) {
            case null:
               true    
              break;
            default:
                // rellenamos los campos de CFDI EN UNA CONSULTA APARTE  
                this.frmCliente.controls['id_sat_regimenfiscal'].setValue(resp.Detalle._app_cliente_cfdi.id_sat_regimenfiscal !== null ? resp.Detalle._app_cliente_cfdi.id_sat_regimenfiscal : null);
                this.frmCliente.controls['id_sat_regimenfiscal'].setValue(resp.Detalle._app_cliente_cfdi.id_sat_usocfdi !== null ? resp.Detalle._app_cliente_cfdi.id_sat_usocfdi : null);
                this.usoCFDI = resp.Detalle._app_cliente_cfdi.usocfdi;
                this.RegimenCFDI = resp.Detalle._app_cliente_cfdi.regimen;
             break;
          }
        });
      }
    });
  }


  //==============================================================================================================
  // Crud Para Clientes:
  public Almacenar = () => {
    // ?=========================================================================
    this.frmCliente.controls['id_estatus'].setValue(parseInt(this.frmCliente.value.id_estatus !== null ? this.frmCliente.value.id_estatus : 1 ));
    this.frmCliente.controls['id_tipo'].setValue(parseInt( this.frmCliente.value.id_tipo !== null ? this.frmCliente.value.id_tipo : null ));
    this.frmCliente.controls['id_moneda'].setValue(parseInt( this.frmCliente.value.id_moneda !== null ? this.frmCliente.value.id_moneda : 1 ));
    //validamos que no este el mensaje en pantalla
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla 
    this.Ariesblocked = true;
    //===============================
    this.servicio.Almacenar(this.frmCliente.value).subscribe(resp => {
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
          this.frmCliente.setValue(this.frmCliente.value);
          // agregamos el ID para generar la actualizacion
          this.frmCliente.controls['id'].setValue(parseInt(resp.Id));
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
  public NuevoCliente = () => {
    // mensaje para verificar la captura de la direccion del sat
    this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del cliente y guarde su información.'});

    // reiniciamos el formulario 
    this.frmCliente.setValue(this.MdlCliente);
    // prime trabaja con String lo pasamos a String el valor numerico
    this.frmCliente.controls['id_estatus'].setValue("1");
    this.frmCliente.controls['id_tipo'].setValue("1");
    this.frmCliente.controls['id_moneda'].setValue("1");
    this._id =-1;
    // solo reiniciamos las variables visuales
    this.usoCFDI = ''
    this.RegimenCFDI = ''
 }

 public Domicilios = () => {
  switch (this._id) {
   case -1:
     this.messageService.add({key: 'tc', severity:'warn', summary: 'Warn', detail: 'No hay un cliente, seleccionado.'});
     break;
   default:
     this.router.navigate([ `/ControlVentas/Domicilio/${this._id}`]);
     break;
  }
 }

  public dlgBuscar(){
  
    this.router.navigate([ `/ControlVentas/Clientes`]);
   
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
    this.usoCFDI = jsonSatUsoCFDI.Descripcion;
    this.frmCliente.controls['id_sat_usocfdi'].setValue(parseInt(jsonSatUsoCFDI.id));
    this.visible = false;
  }
  //==============================================================================================================
  public SatRegimen(jsonRegimenCFDI: any) {
    this.RegimenCFDI = jsonRegimenCFDI.Descripcion;
    this.frmCliente.controls['id_sat_regimenfiscal'].setValue(parseInt(jsonRegimenCFDI.id));
    this.dlgRegimenvisible = false;
  }
  //==============================================================================================================
  public SatCobro(jsonSatCobroCFDI: any) {
    this.SatCobroCFDI = jsonSatCobroCFDI.Descripcion;
    this.frmCliente.controls['id_sat_doc_cobro'].setValue(parseInt(jsonSatCobroCFDI.id));
    this.dlgDocCbrovisible = false;
  }

}