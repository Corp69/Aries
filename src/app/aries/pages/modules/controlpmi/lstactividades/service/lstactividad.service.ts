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
export class lstactividadService {
  constructor(private http: HttpClient, private errores: ErroresService) { }




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

  public lstProyecto(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/filtroIDs`,
      {
        "Qtabla":   "pmi_proyectos",
        "_columna": "id_estatus",
        "_orderBY": "nombre",
        "Datos": {
            "ids": [1]
        }
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }




  public Buscar( data: Mdllst ): Observable<any> {

    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "pmi",
        "funcion":  "_app_lst_cronograma_lst_actividades",
        "data": 
        {
        "_id_proyecto": data._id_proyecto,
        "_id_estatus":  data._id_estatus
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }



}
