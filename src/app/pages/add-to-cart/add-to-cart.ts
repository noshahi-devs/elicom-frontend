import { Component } from '@angular/core';
import { OrderProcessHeader } from '../../shared/components/order-process-header/order-process-header';
import { OrderProcessBreadcrumb } from '../../shared/components/order-process-breadcrumb/order-process-breadcrumb';
import { CartItem } from '../../shared/components/cart-item/cart-item';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [
    OrderProcessHeader,
    OrderProcessBreadcrumb,
    CartItem
  ],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.scss',
})
export class AddToCart {
  brand = 'SMART CART';
  address = 'Ship to Twnhs, 2841 E Waltann Ln Unit 1';
}
