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

  products = [
  {
    id: 1,
    title: 'NOSHAHI EZwear Black Jeans',
    brand: 'NOSHAHI',
    image: 'images/card_4.jpg',
    price: 10,
    oldPrice: 13,
    qty: 1,
    selected: true,
    soldOut: true
  },
  {
    id: 2,
    title: 'NOSHAHI Blue Denim',
    brand: 'NOSHAHI',
    image: 'images/card_4.jpg',
    price: 12,
    qty: 1,
    selected: true
  }
];

get allSelected() {
  return this.products.every(p => p.selected);
}

toggleAll(val: boolean) {
  this.products.forEach(p => p.selected = val);
}



updateProduct() {}

removeProduct(id: number) {
  this.products = this.products.filter(p => p.id !== id);
}

get totalPrice() {
  return this.products
    .filter(p => p.selected)
    .reduce((sum, p) => sum + p.price * p.qty, 0);
}

}
