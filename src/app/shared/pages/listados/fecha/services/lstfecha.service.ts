import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';
import { Mdllst } from '../models/Mdllst';

@Injectable({
  providedIn: 'root',
})
export class LstFechaService {
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


  public Buscar( body: Mdllst ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
    {
      "ExSchema": "venta",
      "funcion": "_app_lst_cliente",
      "data": { body }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }


}
