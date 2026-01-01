import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.scss'],
})
export class CartItem {

  // ================= SHOP =================
  shop = {
    name: 'STARSHIPPER',
    selected: true,
  };

  // ================= PRODUCTS (HARD CODED – API READY) =================
  products = [
    {
      id: 1,
      title: 'STARSHIPPER EZwear Black Slant Pocket Ripped Skinny Jeans',
      brand: 'STARSHIPPER EZwear',
      image: 'assets/images/card_3.jpg',
      price: 10.11,
      oldPrice: 13.11,
      qty: 1,
      color: 'Black',
      size: 'S',
      selected: true,
      soldOut: true,
      fav: false,
      showDeleteConfirm: false,
    }
  ];

  // ================= ALL ITEMS =================
  get allSelected(): boolean {
    return this.products.length > 0 && this.products.every(p => p.selected);
  }

  toggleAll(checked: boolean) {
    this.shop.selected = checked;
    this.products.forEach(p => p.selected = checked);
  }

  // ================= SHOP =================
  toggleShop(checked: boolean) {
    this.shop.selected = checked;
    this.products.forEach(p => p.selected = checked);
  }

  // ================= PRODUCT =================
  toggleProduct(p: any, checked: boolean) {
    p.selected = checked;
    this.shop.selected = this.products.every(x => x.selected);
  }

  // ================= FAVORITE =================
  toggleFav(p: any) {
    p.fav = !p.fav;
  }

  // ================= DELETE =================
  openDelete(p: any) {
    p.showDeleteConfirm = true;
  }

  cancelDelete(p: any) {
    p.showDeleteConfirm = false;
  }

  confirmDelete(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  // ================= FREE SHIPPING =================
  freeShippingLimit = 500;

  get totalPrice(): number {
    return this.products
      .filter(p => p.selected)
      .reduce((sum, p) => sum + p.price * p.qty, 0);
  }

  get remainingForFreeShipping(): number {
    return Math.max(this.freeShippingLimit - this.totalPrice, 0);
  }
}
