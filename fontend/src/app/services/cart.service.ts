import { Injectable } from '@angular/core';
import { cartsType } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CartService {

  carts : cartsType = [];
  price: number = 0;

  constructor(private http:HttpClient) { }

  getFromBuy(item:any){
    this.carts.push(item)
    console.log("From Cs ",this.carts)
    this.price += item.price
    console.log("price fromBuy",this.price)
  }

  deleteFormCart(item:any){
    this.carts[item].quantity+=1;
    this.price -= this.carts[item].price;
    console.log("price from delete"+this.price)
    this.carts.splice(item,1);
  }

  getCart(){
    return this.carts;
  }

  getTotal(){
    return this.carts.length;
  }

  getTotalPrice(){
    return this.price;
  }

  addOrder(product : any){
    console.log('addOrder');
    console.log(product);
    return this.http.post<any>('http://localhost:3000/bookstore/addorder', product)
    .pipe(map(data =>{
      return data;
    }))
  }

}
