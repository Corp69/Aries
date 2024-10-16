import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericaComponent } from '@shared/pages/busquedas/generica/generica.component';
import { NombresComponent } from '@shared/pages/busquedas/nombres/nombres.component';
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MdlExtension } from './models/MdlExtension';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
//Interface
import { ConfirmacionMensaje } from './interface/Extension';
// servicios
import { ExtensionService } from './Services/Extension.service';


@Component({
  selector: 'app-extension',
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
  InputTextModule,
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
  ToastModule,
  TableModule,


  ],
  providers: [MessageService],
  templateUrl: './extension.component.html',
  styleUrl: './extension.component.scss'

  
})
export default class ExtensionComponent {

   //==============================================================================================================
  //modelos:
  public MdlExtension: MdlExtension = new MdlExtension();

   // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;

   // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };
 
  public DataSource: any;
  public DataSourceRespaldo: any = null;

  //Config. de la app: Bloqueo de botones
  public BtnSpinner: boolean = false;

  public onfilter( filtro: any ){
    if (filtro.value == "") {
      this.DataSource = this.DataSourceRespaldo;
    } else {
      this.DataSource = this.DataSource.filter(item => item.descripcion.toLowerCase().includes(filtro.value.toLowerCase()));
    }
  }
  
  public selectRowActividad(  id: number ){ this.router.navigate([ `/ControlEmpresa/Sucursal/${ id }`]);}

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  //==============================================================================================================
  //Formularios del app:
  public frmExtension: FormGroup = this.fb.group({
    id:     [-1],
    descripcion:    [, [Validators.required, Validators.minLength(3)]],
    id_app_general: [1],
    activo:    [true]
    
  });

  constructor(
    private fb: FormBuilder,
    private servicio: ExtensionService,
    private router: Router,
    private messageService: MessageService, )
    {}

     // una vez carga el componente
  ngOnInit(): void {
    //=========================================================================================================================
    //carga listados
    this.servicio.getSucursales().subscribe(resp => { this.DataSource  = resp.Detalle.app_extension_general.sucursales; });

  }

  
    //==============================================================================================================
  // Crud Para Proveedores:
  public Almacenar = () => {
    // ?=========================================================================
    this.ConfirmacionMdl  = false;
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
    //===============================
    this.servicio.AlmacenarExtension(this.frmExtension.value).subscribe(resp => {
      console.log(resp)
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
          this.frmExtension.setValue(this.frmExtension.value);
          // agregamos el ID para generar la actualizacion
          this.frmExtension.controls['id'].setValue(parseInt(resp.Id));
          // mostramos el resultado de la informacion
          this.ConfirmacionMdl  = true;
          // desbloqueamos la pantalla
          this.Ariesblocked     = false;
          break;
      }
      this.BtnSpinner = false;
      this.servicio.getSucursales().subscribe(resp => { this.DataSource  = resp.Detalle.app_extension_general.sucursales; });
    });
  }

  // metodo para agregar un nuevo proveedor
  public NuevoExtension = () => {
   // reiniciamos el formulario
   this.frmExtension.setValue(this.MdlExtension);
   // mensaje para decir que esta OK el formulario
   this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo: Agregue datos del empleado y guarde su información.'});
  }
}
