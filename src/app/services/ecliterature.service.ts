import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Product {
  Id: number;
  BrandId: number;
  Product: string;
  Price: number;
  PercentOff: number;
  Description: string;
  IsFeatured: number;
  Stars: number;
  TaxId: number;
}
export interface Ecliterature {
  id: number;
  Url: string;
  ProductId: number;
}

export interface IEcliteratureService {
  getEcliteratures(): void;
  getProducts(): void;
}

@Injectable({
  providedIn: 'root',
})
export class EcliteratureService implements IEcliteratureService {
  find(arg0: (p: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  // tslint:disable-next-line:member-ordering
  ecliteratures = new Subject<Ecliterature[]>();
  // tslint:disable-next-line:member-ordering
  ecliterature$ = this.ecliteratures.asObservable();

  // tslint:disable-next-line:member-ordering
  products = new Subject<Product[]>();
  // tslint:disable-next-line: member-ordering
  products$ = this.products.asObservable();

  constructor(private http: HttpClient) {}

  getEcliteratures(): void {
    this.http
      .get('https://eckurslitteratur.herokuapp.com/api/productimages')
      .subscribe((ecliteratures: Ecliterature[]) => {
        this.ecliteratures.next(ecliteratures);
      });
  }

  getProducts(): void {
    this.http
      .get('https://eckurslitteratur.herokuapp.com/api/products')
      .subscribe((products: Product[]) => {
        this.products.next(products);
      });
  }
}
