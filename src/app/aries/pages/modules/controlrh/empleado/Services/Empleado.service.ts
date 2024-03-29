import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MdlEmpleado } from '../models/MdlEmpleado';
import { ErroresService } from '../../../../../../shared/errores.service';
import { environment } from '../../../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient, private errores: ErroresService) { }


   // ? ==================================================================================
  // resolver obtnemos informacion del registro
  public Datainfo(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/buscar/id/${id}`,
      {
        Qtabla: 'empleado',
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
        "funcion": "empleadoCfdi",
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
  // ? ==================================================================================



  //==================================================================================================
  //guardar
  public AlmacenarProveedor( modelo: MdlEmpleado ): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .post(
        `${environment.baseUrl}clientes/ctr/agregar`,
        {
          Qtabla: 'rh_empleado',
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

  //===================================================================================================
  //?       Listados: Proveedor 
  /**
   * 
   * @returns  Json Array sexo de empleado
   */
  public listSexo(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes`,
      {
        Qtabla: 'cg_sexo',
      },
      { headers: headers }
    ).pipe(catchError((error) => {return throwError(this.errores.getErrores(error));}));
  }

  /**
   * 
   * @returns Json Array Estatus de proveedor
   */
  public listEmpleadoEstatus(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/crt/list`,
      {
        Qtabla: 'app_estatus',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }


  /**
   * 
   * @returns Json Array Tipo  de proveedor
   */
  public listEmpleadoTipo(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/crt/list`,
      {
        Qtabla: 'app_tipo',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }
  

  /**
   * 
   * @returns JsonArray clasificacion de empleados 
   */
  public listClasificacion(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes`,
      {
        Qtabla: 'rh_clasificacion',
      },
      { headers: headers }
    ).pipe(catchError((error) => {return throwError(this.errores.getErrores(error));}));
  }
  /**
   * 
   * @returns JsonArray Departamentos RH. 
   */
  public listDepartamentos(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes`,
      {
        Qtabla: 'rh_clasificacion',
      },
      { headers: headers }
    ).pipe(catchError((error) => {return throwError(this.errores.getErrores(error));}));
  }
  /**
   * 
   * @returns JsonArray puestos RH. 
   */
  public listPuestos( id: Number ): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes`,
      {
        
          "Qtabla":"rh_puesto",
          "_columna": "id",
          "_orderBY": "descripcion",
          "Datos": {
              "ids": [ id ]
          }
      
      },
      { headers: headers }
    ).pipe(catchError((error) => {return throwError(this.errores.getErrores(error));}));
  }
  /**
   * 
   * @returns jasonArray de grados escolares o nivel academico
   */
  public listGrado(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes`,
      {
        Qtabla: 'rh_grado',
      },
      { headers: headers }
    ).pipe(catchError((error) => {return throwError(this.errores.getErrores(error));}));
  }
  //===================================================================================================
}
