import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { ErroresService } from '../../../shared/errores.service';
import { environment } from '../../../../environments/environment';
import { MdlUser } from '../Models/MdlUser';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //==============================================================================================================
  //modelos:
  public MdlUser: MdlUser = new MdlUser();

  private http = inject( HttpClient );
  private errores = inject(ErroresService);


  checkAuthentication(): Observable<boolean> {
    const token = this.MdlUser.tokken;
    if (!token) return of(false);
    const tokenObject = { "tokken": token };
    return this.http.post(`${environment.baseUrl}auth/Tokken`, tokenObject).pipe(
      map((user: any) => !!user),
      catchError(err => of(false))
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