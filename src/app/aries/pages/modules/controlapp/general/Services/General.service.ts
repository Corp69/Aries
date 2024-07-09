import { Injectable } from '@angular/core';
import { MdlGeneral } from '../models/MdlGeneral';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErroresService } from '@shared/errores.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  constructor(private http: HttpClient, private errores: ErroresService) { }


  // resolver obtnemos informacion del registro
  public Datainfo(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/buscar/id/${id}`,
      {
        Qtabla: 'app_general',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

//guardar
public Almacenar(modelo: MdlGeneral): Observable<any> {
  let headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http
    .post(
      `${environment.baseUrl}clientes/ctr/agregar`,
      {
        Qtabla: 'app_general',
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
};