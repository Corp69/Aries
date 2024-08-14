import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../../environments/environment';
import { Mdllst } from '../models/Mdllst';


@Injectable({
  providedIn: 'root',
})
export class LstDocVentasService {
  constructor(private http: HttpClient, private errores: ErroresService) { }


  //data para recargar la busqueda
  public data: any = {};

  public Lstestatus(): Observable<any> {
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


  public Buscar( data: Mdllst ): Observable<any> {
    // data para recargar la info
    this.data = data;
  
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "contabilidad",
        "funcion":  "lst_comprobantes_fiscales",
        "data": 
        {
        "_fechainicial": data._fechainicial,
        "_fechafinal":  data._fechafinal,
        "_idestatus":          data._idestatus
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }

  public RecargarBuscar( exc: String, fun: String ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "contabilidad",
        "funcion":  "lst_comprobantes_fiscales",
        "data": 
        {
        "_fechainicial": this.data._fechainicial,
        "_fechafinal":  this.data._fechafinal,
        "_idestatus":          this.data._idestatus
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }


}
