import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ErroresService } from '../../shared/errores.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private errores: ErroresService,

    @Inject(DOCUMENT) private document: Document

  ) { }

  public lstOpciones(): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http
      .post(`${environment.baseUrl}clientes/ctr/schema`,
        {
          "ExSchema": "config",
          "funcion": "_app_menu_x_empleado",
          "data": { '_ID_EMPLEADO': `${localStorage.getItem('id')}` }
        },
        { headers: headers })
      .pipe(
        catchError(error => {
          return throwError(this.errores.getErrores(error));
        })
      );
  }

  switchTheme(theme: any) {

    if (theme == null ) {
      theme =  'bootstrap4-dark-purple';
    }

    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}