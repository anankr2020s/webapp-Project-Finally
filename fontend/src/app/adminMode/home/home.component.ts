import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  item = {"_id": Number}
  products: any;
  JsonProduct: any;
  constructor(private OrderService:OrderService ) { }

  ngOnInit(): void {
    this.onLoading();
  }

  onLoading(){
    try {
      this.OrderService.getProducts().subscribe(
        data => {
          this.products = data;
          //this.JsonProduct = JSON.parse(this.products);
          //console.log(this.JsonProduct.price);
          
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
      
    }
  }

  deletebook(item:any){
    console.log(item);
    this.item._id = item;
    console.log(this.item);
    
    try {
      this.OrderService.deleteProduct(this.item).subscribe(
        data => {
          //this.products = data;
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
    this.onLoading();
    window.location.reload();
  }

}
