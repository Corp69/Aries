import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../../environments/environment';
import { MdlCuenta } from '../models/MdlCuenta';


@Injectable({
  providedIn: 'root',
})
export class CuentasService {

  
  constructor(private http: HttpClient, private errores: ErroresService) { }
  
  /**
   * 
   * @function: getCuentas()
   * 
   * @returns Listado de cuenta en formato json 
   */
  public getCuentas(): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/conf/funciones`,
      {
        "ExSchema": "contabilidad",
        "funcion":  "fis_sat_cuentas"
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }
  
  /**
   * @function getTablaCuentas(): devulve la tabla de impuestos deacuerdo a filtro del listado 
   * 
   * @param data: cuentas de segundo nivel catalogo del sat.
   * @returns 
   */
  public getTablaCuentas( _id: Number ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "contabilidad",
        "funcion":  "fis_tabla_sat_cuentas",
        "data": 
        {
        "_id": _id
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }

  
//Actualizar Cuenta
public ActualizarNV2(modelo: MdlCuenta): Observable<any> {
  let headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http
    .post(
      `${environment.baseUrl}clientes/ctr/agregar`,
      {
        Qtabla: 'sat_cuenta_nv2',
        Datos: modelo,
      },
      { headers: headers }
    )
    .pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }



}
