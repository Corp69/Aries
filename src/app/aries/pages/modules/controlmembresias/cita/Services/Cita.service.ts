import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MdlCita } from '../models/MdlCita';
import { environment } from '../../../../../../../environments/environment';
import { ErroresService } from '@shared/errores.service';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  constructor(private http: HttpClient, private errores: ErroresService) { }

  public NuevaCita( data: MdlCita): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": "membresias",
        "funcion": "insert_cita_consecutiva",
        "data": {
          "_descripcion": data.descripcion,
          "_fechainicio": data.fecha_inicio,
          "_fechafinal": data.fecha_final
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
  // ? ==================================================================================


}
