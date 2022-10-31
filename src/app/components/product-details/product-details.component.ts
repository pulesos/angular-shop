import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  id!: any
  productSubscription: Subscription;

  constructor(private route: ActivatedRoute, private ProductsService: ProductsService) {
    this.id = route.snapshot.paramMap.get('id')
  }

  getProduct() {
    this.ProductsService.getProduct(this.id).subscribe(res => {
      this.product = res

    })
  }

  ngOnInit(): void {
    this.getProduct()
  }

}
