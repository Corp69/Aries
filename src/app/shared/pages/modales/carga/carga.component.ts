import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-carga',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ChipModule,
    CardModule,
    AvatarModule,
    FieldsetModule,
    DividerModule,
    ProgressSpinnerModule,
    DialogModule
  ],
  templateUrl: './carga.component.html',
  styleUrl: './carga.component.scss'
})
export class CargaComponent {

  //=================================================================================================================
  // variables entre componentes
  public Visible: boolean = true;
  
}
