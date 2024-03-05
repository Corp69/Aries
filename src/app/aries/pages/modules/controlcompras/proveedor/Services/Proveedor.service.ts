import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MdlProveedor } from '../models/MdlProveedor';
import { ErroresService } from '../../../../../../shared/errores.service';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient, private errores: ErroresService) { }


  // ? ==================================================================================
  // resolver obtnemos informacion del registro
  public Datainfo(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/buscar/id/${id}`,
      {
        Qtabla: 'proveedor',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

  public Datacfdi(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "compras",
        "funcion": "proveedorCfdi",
        "data": {
          "_id_": id
        }
      }
      ,
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }
  // ? ==================================================================================


  //==================================================================================================
  //guardar
  public AlmacenarProveedor(modelo: MdlProveedor): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .post(
        `${environment.baseUrl}clientes/ctr/agregar`,
        {
          Qtabla: 'proveedor',
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

  //===================================================================================================
  //?       Listados: Proveedor 
  /**
   * 
   * @returns  Json Array clasificacion de proveedor
   */
  public listProveedorClasificacion(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/crt/list`,
      {
        Qtabla: 'proveedor_clasificacion',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

  /**
   * 
   * @returns Json Array Estatus de proveedor
   */
  public listProveedorEstatus(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/crt/list`,
      {
        Qtabla: 'app_estatus',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

  /**
   * 
   * @returns Json Array Operacion de proveedor
   */
  public listProveedorOperacion(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/crt/list`,
      {
        Qtabla: 'proveedor_operacion',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

  /**
   * 
   * @returns Json Array Tipo  de proveedor
   */
  public listProveedorTipo(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/crt/list`,
      {
        Qtabla: 'app_tipo',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }
  //===================================================================================================



}
