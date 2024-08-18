import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErroresService } from '@shared/errores.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {

  
  constructor(private http: HttpClient, private errores: ErroresService) { }

  public getCalendario(): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/conf/funciones`,
      {
        "ExSchema": "membresias",
        "funcion":  "Calendario_citas"
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }




}
