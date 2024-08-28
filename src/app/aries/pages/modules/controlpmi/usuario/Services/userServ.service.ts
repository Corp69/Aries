import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { ErroresService } from '@shared/errores.service';

@Injectable({
    providedIn: 'root',
  })
  export class UserServService {
    constructor(private http: HttpClient, private errores: ErroresService) { }

    public FisUser(): Observable<any> {
    let headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
        {
        "ExSchema":"rh",
        "funcion":"_Aries_usuario",
        "data": 
            {
                "_id": parseInt(localStorage.getItem("id"))
            }
        }
        ,
        { headers: headers }
    ).pipe(
        catchError((error) => {
        return throwError(this.errores.getErrores(error));
        })
    );
    }
}


