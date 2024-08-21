import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// import { ErroresService } from '../../shared/errores.service';
// import { environment } from '../../../environments/environment';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
   // private http: HttpClient,
   // private errores: ErroresService,

    @Inject(DOCUMENT) private document: Document

  ) { }

 public switchTheme(theme: any) {
    if (theme == null ) {
      theme =  'bootstrap4-light-purple';
    }
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
    }

  }
}