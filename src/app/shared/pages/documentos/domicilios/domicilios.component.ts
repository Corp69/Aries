import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import { MdlDomicilio } from './models/MdlDomicilio';
import { DomicilioService } from './services/domicilio.service';
import { ConfirmacionMensaje } from './interface/Domicilio';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { list } from '@shared/interfaces/Aries';
import TabalaDomiciliosComponent from '@shared/pages/tablas/domicilios/domicilios.component';



@Component({
  selector: 'aries-domicilios',
  standalone: true,
  imports: [

    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //shared
    ConfirmacionComponent,
    TabalaDomiciliosComponent,
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
    DividerModule
  ],
  templateUrl: './domicilios.component.html',
  styleUrl: './domicilios.component.scss'
})
export default class AppDomiciliosComponent implements OnInit {

  // variables entre componentes
  @Input()
  public tabla: String = "";

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

  // listados
  public lstEstados:   list[] = [];
  public lstMunicipio: list[] = [];
  public lstLocalidad: list[] = [];
  public lstColonia:   list[] = [];


  // bloqueamos el boton
  public BtnSpinner: boolean   = false;
   // variable que bloquea la vista
   public Ariesblocked: boolean  = false;

  //modelos:
  public MdlDomicilio: MdlDomicilio = new MdlDomicilio();

  // FORMULARIO
    //==============================================================================================================
  //Formularios del app:
  public frmDomicilio: FormGroup = this.fb.group({
    id:           [-1],
    id_proveedor: [1],
    calle:   [, [Validators.required, Validators.minLength(3)]],
    num_ext: [, [Validators.required, Validators.minLength(3)]],
    num_int: [, ],
    cp:      [, [Validators.required, Validators.minLength(3)]],

    id_estado:                  [null],
    id_municipio:               [null],
    id_localidad:               [null],
    id_colonia:                 [null],
    activo:                     [true],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private servicio: DomicilioService
    )
    {}

  /**
   * cargamos los estados disponibles al pais 146 mexico
   */
  public ngOnInit(): void {
    this.servicio.lstEstado().subscribe(resp => { this.lstEstados = resp.Detalle });
  }

  /**
   * 
   * @param args filtra por estado seleccionado filtra municipio y localidad
   */
  public onEstado( args: any){
    this.frmDomicilio.controls['id_localidad'].setValue(this.frmDomicilio.value.id_estatus = null );
    this.frmDomicilio.controls['id_municipio'].setValue( this.frmDomicilio.value.id_tipo   = null );
    this.servicio.lstDomicilios( "municipio", args.value ).subscribe(resp => { this.lstMunicipio = resp.Detalle });
    this.servicio.lstDomicilios( "localidad", args.value ).subscribe(resp => { this.lstLocalidad = resp.Detalle });
  }

  /**
   * 
   * @param args filtra por el codigo postal a la colonia
   */
  public onCp( value: number | String){
    switch ( value.toString().length ) {
      case 5: 
      this.servicio.lstCodigoPostal( value.toString()).subscribe(resp => { this.lstColonia = resp.Detalle;});
      break;
      default:
        this.lstColonia = null;
        this.frmDomicilio.controls['id_colonia'].setValue(this.frmDomicilio.value.id_colonia = null );
      break;
    }
  }

  // nuevo registro resetea formulario
  public Nuevo(){
        // reiniciamos el formulario
        this.frmDomicilio.setValue(this.MdlDomicilio);
  }

  //almacena informacion
  public Almacenar = () => {
      console.log(this.frmDomicilio.value);
      // ?=========================================================================
      //this.frmDomicilio.controls['id_estatus'].setValue(parseInt(this.frmDomicilio.value.id_estatus !== null ? this.frmDomicilio.value.id_estatus : 1 ));
      //this.frmDomicilio.controls['id_tipo'].setValue(parseInt( this.frmDomicilio.value.id_tipo !== null ? this.frmDomicilio.value.id_tipo : 1 ));
      //validamos que no este el mensaje en pantalla
      this.ConfirmacionMdl  = false;
      // bloqueamos el boton
      this.BtnSpinner   = true;
      // bloqueamos pantalla
      this.Ariesblocked = true;
      //===============================
      this.servicio.almacenar( this.tabla, this.frmDomicilio.value).subscribe(resp => {
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
            this.frmDomicilio.setValue(this.frmDomicilio.value);
            // agregamos el ID para generar la actualizacion
            this.frmDomicilio.controls['id'].setValue(parseInt(resp.Id));
            // mostramos el resultado de la informacion
            this.ConfirmacionMdl  = true;
            // desbloqueamos la pantalla
            this.Ariesblocked     = false;
            break;
        }
        this.BtnSpinner = false;
      });
  }

}
