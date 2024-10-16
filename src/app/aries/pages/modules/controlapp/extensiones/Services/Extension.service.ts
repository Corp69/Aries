import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ErroresService } from '@shared/errores.service';
import { MdlExtension } from '../models/MdlExtension';

@Injectable({
  providedIn: 'root',
})
export class ExtensionService {

  constructor(private http: HttpClient, private errores: ErroresService) { }

  public getSucursales(): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/conf/funciones`,
      {
        "ExSchema": "config",
        "funcion":  "app_extension_general"
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }


  public AlmacenarExtension(modelo: MdlExtension): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .post(
        `${environment.baseUrl}clientes/ctr/agregar`,
        {
          Qtabla: 'app_extension_general',
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
