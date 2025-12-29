import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,          // ✅ MUST
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {

  // ===== HARD CODED (API READY STRUCTURE) =====
  products = [
    {
      id: 1,
      title: 'Wireless Bluetooth Headphones',
      brand: 'SMART AUDIO',
      image: 'https://via.placeholder.com/120',
      price: 120,
      oldPrice: 150,
      qty: 1,
      selected: true,
      soldOut: false,
    },
    {
      id: 2,
      title: 'Smart Watch Series 9',
      brand: 'SMART TECH',
      image: 'https://via.placeholder.com/120',
      price: 200,
      oldPrice: null,
      qty: 1,
      selected: false,
      soldOut: true,
    }
  ];

  allSelected = false;

  // ===== COMPUTED =====
  get hasSelectedItems(): boolean {
    return this.products.some(p => p.selected);
  }

  get totalPrice(): number {
    return this.products
      .filter(p => p.selected)
      .reduce((sum, p) => sum + (p.price * p.qty), 0);
  }

  // ===== ACTIONS =====
  toggleAll(checked: boolean) {
    this.allSelected = checked;
    this.products.forEach(p => p.selected = checked);
  }

  toggleItem() {
    this.allSelected = this.products.every(p => p.selected);
  }

  increaseQty(p: any) {
    p.qty++;
  }

  decreaseQty(p: any) {
    if (p.qty > 1) {
      p.qty--;
    }
  }

  removeItem(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
