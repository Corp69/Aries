import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class kpiService {
  constructor(private http: HttpClient, private errores: ErroresService) { }

  public getProyectos(): Observable<any> {
    console.log(parseInt(localStorage.getItem('id')))
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema":"pmi",
        "funcion":"_app_lst_proyectos_usuario",
        "data": 
        {
          "_idempleado": parseInt(localStorage.getItem('id'))
        }
    },


      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }



}
