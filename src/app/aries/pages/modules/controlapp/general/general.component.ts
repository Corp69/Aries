import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// modelos
import { MdlGeneral } from './models/MdlGeneral';
// shared
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
// servicios
import { GeneralService } from './Services/General.service';
//Interface
import { ConfirmacionMensaje, listados } from './interface/General';
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
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-general',
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
    DividerModule,
    ToastModule,

  ],
  
  providers: [MessageService],
  templateUrl: './General.component.html',
  styleUrl: './General.component.scss',

})
export default class GeneralComponent implements OnInit, AfterViewInit  {

  // variable para ver el id del empresa
  public _id: number = -1;


  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };


  //==============================================================================================================
  // Modal: mensaje bc-nombreMdl falso para no mostrar la modal true para mostrar
  public nombreMDL: boolean = false;
  // variables para enviar a modal enviar y realizar busqueda
  public bcnombreDataMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: '', mensaje: '', detalle: '' };

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  //=============================================================================================================
  // satMDL
  public GenericaTB: String = "";
  public usoCFDI = ''

  public RegimenCFDI = ''

  //==============================================================================================================
  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;

  public tablaSat3: String = 'sat_doc_cobro';
  public SatCobroCFDI = ''
  //==============================================================================================================
  // Listados:
  public lstestatus:        listados[] = [];
  public lstempresaTipo:  listados[] = [];

  //public lstempresaClasificacion: any;
  //  public lstProovedorOperacion: any;
  //==============================================================================================================
  //modelos:
  public MdlGeneral: MdlGeneral = new this.MdlGeneral();

  //==============================================================================================================
  //Formularios del app:
  public frmGeneral: FormGroup = this.fb.group({
    id:     [-1],
    descripcion: [, [Validators.required, Validators.minLength(3)]],
    id_app_general: [null],
    activo:    [null],
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
    private servicio: GeneralService )
    {}

  // una vez carga el componente
  ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.listGeneralEstatus().subscribe(resp => { this.lstestatus       = resp.Detalle; });
    this.servicio.listGeneralTipo().subscribe(resp =>    { this.lstGeneralTipo = resp.Detalle; });
  }

  /**
   * cargamos la data del empresa una vez cargado todo los componentes
   */
  public ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        this._id = +params['id'];
        // AGREGAMOS LA INFORMACION AL FORMULARIO
        this.servicio.Datainfo(+params['id']).subscribe(resp => {
         //this.frmGeneral.setValue(resp.Detalle);
         // seteamos la informacion
         this.frmGeneral.controls['id'].setValue(resp.Detalle.id);
         this.frmGeneral.controls['descripcion'].setValue(resp.Detalle.nombre);
         // asignamos el valor String debido a que no es int los parsearemos a String
         this.frmGeneral.controls['id_app_general'].setValue(resp.Detalle.id_estatus.toString());
         this.frmGeneral.controls['activo'].setValue(resp.Detalle.id_tipo.toString());
        });
        //CARGAMOS CFDI
        this.servicio.Datacfdi(+params['id']).subscribe(resp => {
          // rellenamos los campos de CFDI EN UNA CONSULTA APARTE
          this.frmGeneral.controls['id_sat_regimenfiscal'].setValue(parseInt(resp.Detalle.empresacfdi.id_sat_regimenfiscal));
          this.frmGeneral.controls['id_sat_regimenfiscal'].setValue(parseInt(resp.Detalle.empresacfdi.id_sat_usocfdi));
          this.usoCFDI = resp.Detalle.empresacfdi.usocfdi;
          this.RegimenCFDI = resp.Detalle.empresacfdi.regimen;
        });
      }
    });
  }


  //==============================================================================================================
  // Crud Para empresa:
 public Almacenar = () => {
    // ?=========================================================================
    this.frmGeneral.controls['id_estatus'].setValue(parseInt(this.frmGeneral.value.id_estatus !== null ? this.frmGeneral.value.id_estatus : 1 ));
    this.frmGeneral.controls['id_tipo'].setValue(parseInt( this.frmGeneral.value.id_tipo !== null ? this.frmGeneral.value.id_tipo : 1 ));
    //validamos que no este el mensaje en pantalla
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    //===============================
    this.servicio.AlmacenarEmpresa(this.frmGeneral.value).subscribe(resp => {
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
          this.frmGeneral.setValue(this.frmGeneral.value);
          // agregamos el ID para generar la actualizacion
          this.frmGeneral.controls['id'].setValue(parseInt(resp.Id));
          this._id = parseInt(resp.Id);
          // mostramos el resultado de la informacion
          this.ConfirmacionMdl  = true;
          // desbloqueamos la pantalla
          this.Ariesblocked     = false;
          break;
      }
      this.BtnSpinner = false;
    });
  }

  // metodo para agregar un nuevo empresa
  public NuevaEmpresa = () => {
    // reiniciamos el formulario
    this.frmGeneral.setValue(this.MdlGeneral);
    // prime trabaja con String lo pasamos a String el valor numerico
    this.frmGeneral.controls['id_estatus'].setValue("1");
    this.frmGeneral.controls['id_tipo'].setValue("1");
    // solo reiniciamos las variables visuales
    this.usoCFDI = "";
    this.RegimenCFDI = "";
    this._id =-1;
     // mensaje para verificar la captura de la direccion del sat
     this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue información.'});

  }

  // metodo para buscar un nuevo empresa
  public Buscar = () => {
   this.nombreMDL = true;
  }

  public Domicilios = () => {
   switch (this._id) {
    case -1:
      this.messageService.add({key: 'tc', severity:'warn', summary: 'Warn', detail: 'No Hay Un empresa Seleccionado.'});
      break;
    default:
      this.router.navigate([ `/ControlCompras/Domicilio/${this._id}`]);
      break;
   }
  }

  //==============================================================================================================
  //Modales:
  public visible: boolean = false;
  public dlgRegimenvisible: boolean = false;
  public dlgbuscar: boolean = false;
  //==============================================================================================================
  // uso cfdi
  public dlgUsocfdi =  () => { this.visible = true; this.GenericaTB = "sat_usocfdi" }
  // regimen
  public dlgRegimen =  () => { this.dlgRegimenvisible = true; this.GenericaTB = "sat_regimenfiscal" }
  // Busqueda generica.
  public dlgBuscar =  () => { this.dlgbuscar = true; this.GenericaTB = "General" }
  //public dlgDocCbro =  () => { this.dlgDocCbrovisible = true; this.GenericaTB = "sat_regimenfiscal"}
  //==============================================================================================================
  // metodo para asignar el valor buscado
  public SatUsoCfedi( response: any) {
    this.usoCFDI = response.descripcion;
    this.frmGeneral.controls['id_sat_usocfdi'].setValue(parseInt(response.id));
    this.visible = false;
  }
  //==============================================================================================================
  // metodo para asignar el valor buscado
  public SatRegimen( response: any) {
    this.RegimenCFDI = response.descripcion;
    this.frmGeneral.controls['id_sat_regimenfiscal'].setValue(parseInt(response.id));
    this.dlgRegimenvisible = false;
  }

  //==============================================================================================================
  // metodo generico de busqueda...
  public Busqueda( response: any) {
    // cargamos al objeto a buscar
    this.dlgbuscar = false;
    this.router.navigate(['/extensiones/General/' + parseInt(response.id)]);

  }
}
