import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { MdlUser } from '../Models/MdlUser';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class descargService {

  //==============================================================================================================
  //modelos:
  public MdlUser: MdlUser = new MdlUser();

  private http = inject(HttpClient);
  private errores = inject(ErroresService);

  public inicioSesion3(modelo: MdlUser): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}auth/login`, modelo)
      .pipe(
        catchError(error => {
          return throwError(this.errores.getErrores(error));
        })
      );
  }

  
  public checkAuthentication(): Observable<boolean> {
    this.MdlUser.set_tokken(localStorage.getItem('token') !== null ? localStorage.getItem('token') : "");
    const token = this.MdlUser.get_tokken();
    if (!token) return of(false);
    const tokenObject = { "tokken": token };
    return this.http.post(`${environment.baseUrl}auth/Tokken`, tokenObject).pipe(
      map((user: any) => !!user),
      catchError(err => of(false))
    );
  }

}