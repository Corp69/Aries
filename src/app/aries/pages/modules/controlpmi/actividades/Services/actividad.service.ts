import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { ErroresService } from '@shared/errores.service';
import { MdlActividades } from '../models/MdlActividades';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
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

    /**
   * 
   * @returns Json Array Estatus 
   */
    public lstEstatus(): Observable<any> {
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

  //==================================================================================================
  //guardar
  public Almacenar(modelo: MdlActividades ): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .post(
        `${environment.baseUrl}clientes/ctr/agregar`,
        {
          Qtabla: 'pmi_actividades',
          Datos:  modelo,
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
