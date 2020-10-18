import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CartItemService, CartItem } from '../../services/cart-item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartItemService: CartItemService) {}

  ngOnInit(): void {
    this.cartItems = this.cartItemService.getCartItems();
    console.log(this.cartItems);
  }

  onRemoveOrder(cartItem: CartItem) {
    this.cartItemService.removeCartItem(cartItem);
    this.cartItems = this.cartItemService.getCartItems();
  }

  onQuantityIncrease(cartItem: CartItem) {
    this.cartItemService.onItemIncrease(cartItem);
    this.cartItems = this.cartItemService.getCartItems();
  }

  onQuantityDecrease(cartItem: CartItem) {
    this.cartItemService.onItemDecrease(cartItem);
    this.cartItems = this.cartItemService.getCartItems();
  }
}


