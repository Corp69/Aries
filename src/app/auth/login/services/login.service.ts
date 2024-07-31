import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { MdlUser } from '../Models/MdlUser';
import { ErroresService } from '@shared/errores.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];



  productNames: string[] = [
    "Bamboo Watch", 
    "Black Watch", 
    "Blue Band", 
    "Blue T-Shirt", 
    "Bracelet", 
    "Brown Purse", 
    "Chakra Bracelet",
    "Galaxy Earrings",
    "Game Controller",
    "Gaming Set",
    "Gold Phone Case",
    "Green Earbuds",
    "Green T-Shirt",
    "Grey T-Shirt",
    "Headphones",
    "Light Green T-Shirt",
    "Lime Band",
    "Mini Speakers",
    "Painted Phone Case",
    "Pink Band",
    "Pink Purse",
    "Purple Band",
    "Purple Gemstone Necklace",
    "Purple T-Shirt",
    "Shoes",
    "Sneakers",
    "Teal T-Shirt",
    "Yellow Earbuds",
    "Yoga Mat",
    "Yoga Set",
];


generatePrduct(): any {
    const product: any =  {
        id: this.generateId(),
        name: this.generateName(),
        description: "Product Description",
        price: this.generatePrice(),
        quantity: this.generateQuantity(),
        category: "Product Category",
        inventoryStatus: this.generateStatus(),
        rating: this.generateRating()
    };

    product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
    return product;
}

generateId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return text;
}

generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
}

generatePrice() {
    return Math.floor(Math.random() * Math.floor(299)+1);
}

generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75)+1);
}

generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
}

generateRating() {
    return Math.floor(Math.random() * Math.floor(5)+1);
}






















}