import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, of } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { map, tap, take } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products: Product[] = [];
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.getProducts()
      .subscribe(
        products => this.products = products,
        error => this.errorMessage = error
      );

      // of(2, 4, 6).pipe(
      //   map(item => item * 2),
      //   map(item => item + 1)
      // ).subscribe(console.log);

      // of(2, 4, 6).pipe(
      //   tap(item => console.log(item)),
      //   map(item => item * 2),
      //   tap(item => console.log(item)),
      //   map(item => item + 1),
      //   tap(item => console.log(item))
      // ).subscribe();

      // of(2, 4, 6).pipe(
      //   map(item => item * 2),
      //   tap(item => console.log(item)),
      //   take(2),
      //   tap(item => console.log(item))
      // ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
