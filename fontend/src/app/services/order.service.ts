import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: any;
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<any>('http://localhost:3000/bookstore/getorder')
    .pipe(map(data => {
      if (data) {
        this.products = data;
        //console.log(this.products);
      }
      return this.products;
    }))
  }

  deleteProduct(product : any){
    return this.http.post<any>('http://localhost:3000/bookstore/deleteorder', product)
    .pipe(map(data =>{
      return data;
    }))
  }

}
