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

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [  
     CommonModule,
     ReactiveFormsModule,
     DividerModule,
     MessagesModule,
     MessageModule,
     DropdownModule,
     CardModule,
     ProgressSpinnerModule
    ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export default class ProveedoresComponent {

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
  public lstProveedorClasificacion: any;
  public lstProovedorOperacion: any;
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
    rfc: [],
    curp: [],
    id_app_estatus: [1],
    id_app_tipo: [1],
    id_rh_empleado: [localStorage.getItem("id")],
    id_sat_usocfdi: [1],
    //id_sat_doc_cobro:           [1],
    id_sat_regimenfiscal: [1],
    imagen: []
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
         this.frmProveedor.controls['nombre'].setValue(resp.Detalle.nombre);
         this.frmProveedor.controls['rfc'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['codigo'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['curp'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['correo'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['imagen'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['id_app_estatus'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['id_app_tipo'].setValue(resp.Detalle.rfc);
         this.frmProveedor.controls['id_rh_empleado'].setValue(resp.Detalle.rfc);
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
      switch (resp.Detalle) {
        case null:
          this.visibleMjs = true;
          //============================================================
          this.msjBody.msjTipo = 3;
          this.msjBody.titulo = 'Modulo Servicio: Developer®';
          this.msjBody.mensaje = 'La consulta de manera exitosa !';
          this.msjBody.detalle = 'Web Service Esta Fallando';
          break;
        case undefined:
          this.visibleMjs = true;
          //============================================================
          this.msjBody.msjTipo = 3;
          this.msjBody.titulo = 'Modulo Servicio: Developer®';
          this.msjBody.mensaje = 'La consulta de manera exitosa !';
          this.msjBody.detalle = 'Web Service Esta Fallando';
          break;
        default:
          this.visibleMjs = true;
          this.msjBody.msjTipo = 1;
          //============================================================
          this.msjBody.titulo = resp.Titulo;
          this.msjBody.titulo = 'Modulo Servicio: Developer®';
          this.msjBody.mensaje = resp.Mensaje;
          this.msjBody.detalle = resp.Detalle;
          //============================================================
          this.frmProveedor.setValue(this.frmProveedor.value);
          this.frmProveedor.controls['id'].setValue(parseInt(resp.Id));
          break;
      }
      this.BtnSpinner = false;
    });
    //===============================
  }



  public NuevoProvedor = () => {}






}
