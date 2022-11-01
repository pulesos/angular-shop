import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private ProductsService: ProductsService) { }

  basket: IProducts[]
  basketSubscription: Subscription
  total = 0

  ngOnInit(): void {
    // this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
    //   this.basket = data
    //   this.basket.forEach(item => {
    //     this.total += (item.quantity * item.price)
    //   })
    // })
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe(basket => {
      this.basket = basket
      this.basket.forEach(item => {
        this.total += (item.quantity * item.price)
      })
    })
  }


  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  minusItemFromBasket(basket: IProducts) {
    if(basket.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(basket)
        let idx = this.basket.findIndex((data) => data.id === basket.id)
        this.basket.splice(idx, 1)
        this.total = 0
      
    } else {
      basket.quantity -= 1;
      this.ProductsService.updateProductToBasket(basket).subscribe((data) => {
        this.basket.forEach(item => {
          this.total -= item.price
        })
      })
    }

  }

  plusItemFromBasket(basket: IProducts) {
    basket.quantity += 1;
    this.ProductsService.updateProductToBasket(basket).subscribe((data) => {
      this.basket.forEach(item => {
        this.total += item.price
      })
    });
  }
}
