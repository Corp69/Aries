import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { ErroresService } from '@shared/errores.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  listProveedorTipo() {
    throw new Error('Method not implemented.');
  }
  listProveedorEstatus() {
    throw new Error('Method not implemented.');
  }
  AlmacenarEmpresa(value: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private errores: ErroresService) { }


  // ? ==================================================================================
  // resolver obtnemos informacion del registro
  public Datainfo(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/buscar/id/${id}`,
      {
        Qtabla: 'proveedor',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

  public Datacfdi(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "compras",
        "funcion": "proveedorCfdi",
        "data": {
          "_id_": id
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
