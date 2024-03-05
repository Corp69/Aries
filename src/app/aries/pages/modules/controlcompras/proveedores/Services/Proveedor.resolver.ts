import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProveedorService } from './Proveedor.service';

@Injectable()
export class ProveedorResolver implements Resolve<any> {

  constructor( private service: ProveedorService ) { }
  //===============================================================================================
  // resolver carga por ruta
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // consumimos el servicio para traer datos del registro
    return this.service.Datainfo(route.params['id']);
  }

}
