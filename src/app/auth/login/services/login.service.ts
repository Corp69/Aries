import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ErroresService } from '../../../shared/errores.service';
import { environment } from '../../../../environments/environment';
import { MdlUser } from '../Models/MdlUser';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject( HttpClient );
  private errores = inject(ErroresService);


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