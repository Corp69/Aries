import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LstCronogramaService {
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


  public getCronogramas( _id: number ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "pmi",
        "funcion":  "_app_lst_cronogramas",
        "data": 
        {
        "_idproyecto": _id
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }

  // public RecargarBuscar( exc: String, fun: String ): Observable<any> {
  //   let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  //    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
  //     {
  //       "ExSchema": exc,
  //       "funcion":  fun,
  //       "data": 
  //       {
  //       "_idproyecto": 1
  //       }
  //   },
  //     { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  // }


}
