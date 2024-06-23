import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';
import { Mdllst } from '../models/Mdllst';


export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}


@Injectable({
  providedIn: 'root',
})
export class LstproyectoService {
  constructor(private http: HttpClient, private errores: ErroresService) { }


  //data para recargar la busqueda
  public data: any = {};

  public Lstestatus(): Observable<any> {
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


  public Buscar( exc: String, fun: String,  data: Mdllst ): Observable<any> {
    // data para recargar la info
    this.data = data;
  
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": exc,
        "funcion":  fun,
        "data": 
        {
        "_fecha_inicio": data._fecha_inicio,
        "_fecha_final":  data._fecha_final,
        "_id_":          data._id_
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }

  public RecargarBuscar( exc: String, fun: String ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": exc,
        "funcion":  fun,
        "data": 
        {
        "_fecha_inicio": this.data._fecha_inicio,
        "_fecha_final":  this.data._fecha_final,
        "_id_":          this.data._id_
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
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


  getProductsSmall() {
      return this.http.get<any>('assets/products-small.json')
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => { return data; });
  }

  getProducts() {
      return this.http.get<any>('assets/products.json')
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => { return data; });
  }

  getProductsWithOrdersSmall() {
      return this.http.get<any>('assets/products-orders-small.json')
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => { return data; });
  }

  generatePrduct(): Product {
      const product: Product =  {
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
