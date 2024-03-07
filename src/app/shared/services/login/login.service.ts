import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { MdlUser } from '../../models/login/MdlUser';
import { ErroresService } from '../../errores.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject( HttpClient );
  private errores = inject(ErroresService);
  /*
  public inicioSesion3(modelo: MdlUser) : Observable<any> {
    return this.http.get<any>(`${ this.baseUrl }`, modelo)
      .pipe(
        map( response => response.data ),
        tap( console.log ),
      );
  }*/

  public checkAuthentication(body: JSON) : Observable<any> {
    return this.http
      .post(`${environment.baseUrl}auth/Tokken`, body)
      .pipe(
        catchError(error => {
          return throwError(this.errores.getErrores(error));
        })
      );
  }

public inicioSesion3(modelo: MdlUser) : Observable<any> {
  return this.http
    .post(`${environment.baseUrl}auth/login`, modelo)
    .pipe(
      catchError(error => {
         return throwError(this.errores.getErrores(error));
      })
    );
}

}