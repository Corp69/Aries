import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor() { }

  /**
   * Metodo para obtener una respuesta para el usuario y comprender el error
   * 
   * @param error HttpErrorResponse, puede provenir de un "catchError"
   * @returns String con el texto apropiado para mostrar al empleado
   */
  public getErrores(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `La URL no esta disponible: ${error.message}`;
      }
      case 403: {
        return `No tienes Acceso: ${error.message}`;
      }
      case 500: {
        return `Problemas con el servicio: ${error.message}`;
      }
      default: {
        return `Tenemos un problema que no identifico: ${error.message}`;
      }
    }
  }
}
