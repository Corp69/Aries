import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { MdlUser } from '../Models/MdlUser';
import { environment } from '../../../../environments/environment';
import { ErroresService } from '../../../shared/errores.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient,
    private errores: ErroresService ) { }


    logout() {
      localStorage.clear();
    }

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