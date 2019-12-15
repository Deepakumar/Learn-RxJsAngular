import { ProductCategoryService } from './../product-categories/product-category.service';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, of, Observable, EMPTY, combineLatest, Subject } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { map, tap, take, catchError, startWith } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent   {
  pageTitle = 'Product List';
  errorMessage = '';
  //selectedCategoryId = 1;
  private categorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([this.productService.productsWithAdd$, this.categorySelectedAction$.pipe(
    startWith(0)
  )]).pipe(
    map(([products, selectedCategoryId]) => products.filter(product  =>
      selectedCategoryId ? product.categoryId === selectedCategoryId : true)),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // products$ = this.productService.productsWithCategory$.pipe(
  //   catchError(err => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );

  // productsSimpleFilter$ = this.productService.productsWithCategory$.pipe(
  //   map(products => products.filter(product => this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true))
  // );

  categories$ = this.productCategoryService.ProductCategories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    //this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId);
  }
}
