import { Component } from '@angular/core';
import { MdlProveedor } from './models/MdlProveedor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from './Services/Proveedor.service';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';


@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [
    
    KeyFilterModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    ReactiveFormsModule,
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
    DividerModule
  ],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.scss'
})
export default class ProveedorComponent {

   //==============================================================================================================
  // Modal: mensaje Confirmacion 
  public visibleMjs: boolean = false;
  // variables para mensaje actualizar guardar 
  public msjBody: any = { msjTipo: 1, titulo: '', mensaje: '', detalle: '' };

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
  public lstestatus: any;
  public lstProveedorTipo: any;
    
  //public lstProveedorClasificacion: any;
  //  public lstProovedorOperacion: any;
  //==============================================================================================================
  //modelos:
  public MdlProveedor: MdlProveedor = new MdlProveedor();
  //==============================================================================================================
  //Formularios del app:
  public frmProveedor: FormGroup = this.fb.group({
    id: [-1],
    nombre: [, [Validators.required, Validators.minLength(3)]],
    codigo: [],
    correo: [],
    rfc: [, [Validators.required, Validators.minLength(3)]],
    curp: [],
    id_app_estatus: [1],
    id_app_tipo: [1],
    id_rh_empleado: [ parseInt(localStorage.getItem("id"))],
    id_sat_usocfdi: [1],
    //id_sat_doc_cobro:           [1],
    id_sat_regimenfiscal: [1],
    imagen: [null]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private servicio: ProveedorService
    //private datePipe: DatePipe,
  ) {
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        // AGREGAMOS LA INFORMACION AL FORMULARIO
        this.servicio.Datainfo(+params['id']).subscribe(resp => {
         // this.frmProveedor.setValue(resp.Detalle);
         // seteamos la informacion
         this.frmProveedor.controls['id'].setValue(resp.Detalle.id);
         this.frmProveedor.controls['nombre'].setValue(resp.Detalle.nombre);
         this.frmProveedor.controls['rfc'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['codigo'].setValue(resp.Detalle.codigo);
         this.frmProveedor.controls['curp'].setValue(resp.Detalle.curp);
         this.frmProveedor.controls['correo'].setValue(resp.Detalle.correo);
         this.frmProveedor.controls['imagen'].setValue(resp.Detalle.imagen);
         this.frmProveedor.controls['id_app_estatus'].setValue(resp.Detalle.id_app_estatus);
         this.frmProveedor.controls['id_app_tipo'].setValue(resp.Detalle.id_app_tipo);
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


  ngOnInit() {

    //=========================================================================================================================
    //carga listados
    this.servicio.listProveedorEstatus().subscribe(resp => { this.lstestatus = resp.Detalle; });
    this.servicio.listProveedorTipo().subscribe(resp => { this.lstProveedorTipo = resp.Detalle; });
    //this.servicio.listProveedorOperacion().subscribe(resp => {this.lstProovedorOperacion = resp.Detalle;});
    //this.servicio.listProveedorClasificacion().subscribe(resp => {this.lstProveedorClasificacion = resp.Detalle;});
    //=========================================================================================================================
  }



 //==============================================================================================================
  // Crud Para Proveedores:
  Almacenar = () => {
    this.BtnSpinner = true;
    //===============================
    this.servicio.AlmacenarProveedor(this.frmProveedor.value).subscribe(resp => {
      console.log( resp )
      
      switch (resp.IdMensj) {
        case 3:
          //============================================================
          this.msjBody.msjTipo = resp.IdMensj;
          this.msjBody.titulo  = 'Aries: Info'; //resp.Titulo;
          this.msjBody.mensaje = resp.Mensaje; 
          this.msjBody.detalle = resp.Solucion; 
          break;
        case 2:
          //============================================================
          this.msjBody.msjTipo = resp.IdMensj;
          this.msjBody.titulo  = 'Aries: Info'; //resp.Titulo;
          this.msjBody.mensaje = resp.Mensaje; 
          this.msjBody.detalle = resp.Detalle; 
          break;
        default:
          console.log( resp.Titulo);
          //============================================================
          this.msjBody.msjTipo = resp.IdMensj;
          this.msjBody.titulo  = 'Aries: Info'; //resp.Titulo;
          this.msjBody.mensaje = resp.Mensaje; 
          this.msjBody.detalle = resp.Detalle; 
          //============================================================
          this.frmProveedor.setValue(this.frmProveedor.value);
          this.frmProveedor.controls['id'].setValue(parseInt(resp.Id));
          break;
      }
      this.visibleMjs = true;
      this.BtnSpinner = false;
    });
    //===============================
  }

  // metodo para agregar un nuevo proveedor
  public NuevoProvedor = () => {
    this.visibleMjs = false;
    this.frmProveedor.setValue(this.MdlProveedor);
    this.usoCFDI = ''
    this.RegimenCFDI = ''
  }

   //==============================================================================================================
  //Modales:
  public visible: boolean = false;
  public dlgRegimenvisible: boolean = false;
  public dlgDocCbrovisible: boolean = false;
  //==============================================================================================================
  public showDialog = () => { this.visible = true; }
  public dlgRegimen = () => { this.dlgRegimenvisible = true; }
  public dlgDocCbro = () => { this.dlgDocCbrovisible = true; }
  public closeDialog = () => { this.visible = false; }
  //==============================================================================================================
  public SatUsoCfedi(jsonSatUsoCFDI: any) {
    this.usoCFDI = jsonSatUsoCFDI.descripcion;
    this.frmProveedor.controls['id_sat_usocfdi'].setValue(parseInt(jsonSatUsoCFDI.id));
    this.visible = false;
  }
  //==============================================================================================================
  public SatRegimen(jsonRegimenCFDI: any) {
    this.RegimenCFDI = jsonRegimenCFDI.descripcion;
    this.frmProveedor.controls['id_sat_regimenfiscal'].setValue(parseInt(jsonRegimenCFDI.id));
    this.dlgRegimenvisible = false;
  }
  //==============================================================================================================
  public SatCobro(jsonSatCobroCFDI: any) {
    this.SatCobroCFDI = jsonSatCobroCFDI.descripcion;
    this.frmProveedor.controls['id_sat_doc_cobro'].setValue(parseInt(jsonSatCobroCFDI.id));
    this.dlgDocCbrovisible = false;
  }

}
