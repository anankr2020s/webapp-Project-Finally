import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { cartsType } from 'src/app/cart.model';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-buy-products',
  templateUrl: './buy-products.component.html',
  styleUrls: ['./buy-products.component.css']
})
export class BuyProductsComponent implements OnInit {

  @Input() item: any;
  cart: cartsType = [];
  show: boolean = true;
  price: number =0;
  count: number = 0;

  constructor(private BookService:BookService,private CartService:CartService) {
  }
    
  ngOnInit(): void {
  }

  addtoCart(){
    console.log("add new product"+this.item)
    if(this.item.quantity == 0){
      this.show = false;
      this.count = 0;
    }else{
      this.count +=1;
    console.log(this.count)
    this.CartService.getFromBuy(this.item);
    this.updateMinusStock(this.item,1);
    }
    
    
  }

  getTotal(){
    return this.count;
  }

  updateMinusStock(item:any,count:any){
    console.log(item+"--> newQ = "+count);
    if( count === undefined) count=0;
    item.quantity = item.quantity - Number(count);
    if(item.quantity == 0){
      this.show = !this.show
    }
    try {
      this.BookService.updateBook(this.item).subscribe(
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
  }

}
