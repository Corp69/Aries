import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// modelos
import { MdlProveedor } from './models/MdlProveedor';
// shared
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
// servicios
import { ProveedorService } from './Services/Proveedor.service';
//Interface
import { ConfirmacionMensaje, listados } from './interface/proveedor';
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

@Component({
  selector: 'app-proveedor',
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
    ToastModule,

  ],
  providers: [MessageService],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.scss'
})
export default class ProveedorComponent implements OnInit, AfterViewInit  {

  // variable para ver el id del proveedor
  public _id: number = -1;


  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

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
  public lstProveedorTipo:  listados[] = [];

  //public lstProveedorClasificacion: any;
  //  public lstProovedorOperacion: any;
  //==============================================================================================================
  //modelos:
  public MdlProveedor: MdlProveedor = new MdlProveedor();

  //==============================================================================================================
  //Formularios del app:
  public frmProveedor: FormGroup = this.fb.group({
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
    private servicio: ProveedorService )
    {}

  // una vez carga el componente
  ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.listProveedorEstatus().subscribe(resp => { this.lstestatus       = resp.Detalle; });
    this.servicio.listProveedorTipo().subscribe(resp =>    { this.lstProveedorTipo = resp.Detalle; });
  }

  /**
   * cargamos la data del proveedor una vez cargado todo los componentes
   */
  public ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        this._id = +params['id'];
        // AGREGAMOS LA INFORMACION AL FORMULARIO
        this.servicio.Datainfo(+params['id']).subscribe(resp => {
         //this.frmProveedor.setValue(resp.Detalle);
         // seteamos la informacion
         this.frmProveedor.controls['id'].setValue(resp.Detalle.id);
         this.frmProveedor.controls['nombre'].setValue(resp.Detalle.nombre);
         this.frmProveedor.controls['rfc'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['codigo'].setValue(resp.Detalle.codigo);
         this.frmProveedor.controls['curp'].setValue(resp.Detalle.curp);
         this.frmProveedor.controls['correo'].setValue(resp.Detalle.correo);
         this.frmProveedor.controls['imagen'].setValue(resp.Detalle.imagen);
         // asignamos el valor String debido a que no es int los parsearemos a String
         this.frmProveedor.controls['id_estatus'].setValue(resp.Detalle.id_estatus.toString());
         this.frmProveedor.controls['id_tipo'].setValue(resp.Detalle.id_tipo.toString());
         this.frmProveedor.controls['id_rh_empleado'].setValue(parseInt(resp.Detalle.id_rh_empleado));
        });
        //CARGAMOS CFDI
        this.servicio.Datacfdi(+params['id']).subscribe(resp => {
          // rellenamos los campos de CFDI EN UNA CONSULTA APARTE
          this.frmProveedor.controls['id_sat_regimenfiscal'].setValue(parseInt(resp.Detalle.proveedorcfdi.id_sat_regimenfiscal));
          this.frmProveedor.controls['id_sat_regimenfiscal'].setValue(parseInt(resp.Detalle.proveedorcfdi.id_sat_usocfdi));
          this.usoCFDI = resp.Detalle.proveedorcfdi.usocfdi;
          this.RegimenCFDI = resp.Detalle.proveedorcfdi.regimen;
        });
      }
    });
  }


  //==============================================================================================================
  // Crud Para Proveedores:
 public Almacenar = () => {
    // ?=========================================================================
    this.frmProveedor.controls['id_estatus'].setValue(parseInt(this.frmProveedor.value.id_estatus !== null ? this.frmProveedor.value.id_estatus : 1 ));
    this.frmProveedor.controls['id_tipo'].setValue(parseInt( this.frmProveedor.value.id_tipo !== null ? this.frmProveedor.value.id_tipo : 1 ));
    //validamos que no este el mensaje en pantalla
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    //===============================
    this.servicio.AlmacenarProveedor(this.frmProveedor.value).subscribe(resp => {
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
          this.frmProveedor.setValue(this.frmProveedor.value);
          // agregamos el ID para generar la actualizacion
          this.frmProveedor.controls['id'].setValue(parseInt(resp.Id));
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

  // metodo para agregar un nuevo proveedor
  public NuevoProvedor = () => {
    // reiniciamos el formulario
    this.frmProveedor.setValue(this.MdlProveedor);
    // prime trabaja con String lo pasamos a String el valor numerico
    this.frmProveedor.controls['id_estatus'].setValue("1");
    this.frmProveedor.controls['id_tipo'].setValue("1");
    // solo reiniciamos las variables visuales
    this.usoCFDI = "";
    this.RegimenCFDI = "";
    this._id =-1;
     // mensaje para verificar la captura de la direccion del sat
     this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del proveedor y guarde su información.'});

  }

  // metodo para buscar un nuevo proveedor
  public Buscar = () => {
   this.router.navigate([ `/ControlCompras/Domicilio/${this._id}`]);
  }

  public Domicilios = () => {
   switch (this._id) {
    case -1:
      this.messageService.add({key: 'tc', severity:'warn', summary: 'Warn', detail: 'No Hay Un Proveedor Seleccionado.'});
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
  //==============================================================================================================
  // uso cfdi
  public dlgUsocfdi =  () => { this.visible = true; this.GenericaTB = "sat_usocfdi" }
  // regimen
  public dlgRegimen =  () => { this.dlgRegimenvisible = true; this.GenericaTB = "sat_regimenfiscal" }
  //public dlgDocCbro =  () => { this.dlgDocCbrovisible = true; this.GenericaTB = "sat_regimenfiscal"}
  //==============================================================================================================
  // metodo para asignar el valor buscado
  public SatUsoCfedi( response: any) {
    this.usoCFDI = response.Descripcion;
    this.frmProveedor.controls['id_sat_usocfdi'].setValue(parseInt(response.id));
    this.visible = false;
  }
  //==============================================================================================================
  // metodo para asignar el valor buscado
  public SatRegimen( response: any) {
    this.RegimenCFDI = response.Descripcion;
    this.frmProveedor.controls['id_sat_regimenfiscal'].setValue(parseInt(response.id));
    this.dlgRegimenvisible = false;
  }

  public lstProveedores (){
    this.router.navigate([ `/ControlCompras/proveedores`]);
  }

}
