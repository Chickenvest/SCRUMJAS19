import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartItemService } from 'src/app/services/cart-item.service';
import { Ecliterature, EcliteratureService, Product } from '../../services/ecliterature.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ecliteratures: Ecliterature[] = [];
  products: Product[] = [];
  totalCartItem: number;

  constructor(private service: EcliteratureService,
    // tslint:disable-next-line: align
    private productService: EcliteratureService,
    // tslint:disable-next-line:align
    private cartItemService: CartItemService
  ) { }

  ngOnInit(): void {
    this.service.ecliterature$.subscribe(ecliteratures => {
      this.ecliteratures = ecliteratures;

      console.log(ecliteratures);
    });
    this.service.getEcliteratures();

    this.productService.products$.subscribe(products => {
      this.products = products;

      console.log(this.products);
    });
    this.productService.getProducts();

    this.totalCartItem = this.cartItemService.getCartItems().length;
  }

  onAddProduct(ecliterature: Ecliterature) {
    const product = this.products.find((p) => p.Id === ecliterature.ProductId);
    this.cartItemService.addToCart(product, ecliterature);
    this.totalCartItem = this.cartItemService.getCartItems().length;
  }

  isProductInCart(ecliterature: Ecliterature) {
    return !this.cartItemService.getCartItems.bind(({ productId }) => productId === ecliterature.ProductId,
      ({ ecliteratureId }) => ecliteratureId === ecliterature.id
    );
  }

  onRemoveFromCart(ecliterature: Ecliterature) {
    const product = this.products.find((p) => p.Id === ecliterature.ProductId);
    this.cartItemService.removeCartItem({
      productId: product.Id,
      total: 1,
      price: 0,
      product: product.Product,
      Url: ecliterature.Url,
      id: ecliterature.id
    });
    this.totalCartItem = this.cartItemService.getCartItems().length;
  }
}

