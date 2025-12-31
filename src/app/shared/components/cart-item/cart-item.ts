import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.scss'],  // fixed typo from styleUrl
})
export class CartItem {

  // ================= SHOP =================
  shop = {
    name: 'NOSHAHI',
    selected: true,
  };

  // ================= PRODUCTS (hardcoded for now) =================
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
      fav: false,
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
      soldOut: false,
      fav: false,
    }
  ];

  allSelected: boolean = false;

  // ================= FREE SHIPPING CONFIG =================
  freeShippingLimit = 500;  // Hardcode kar di, adjust karo apne products ke hisab se

  // ================= COMPUTED =================
  get totalPrice(): number {
    return this.products
      .filter(p => p.selected)
      .reduce((sum, p) => sum + (p.price * p.qty), 0);
  }

  get remainingForFreeShipping(): number {
    const remaining = this.freeShippingLimit - this.totalPrice;
    return remaining > 0 ? remaining : 0;
  }

  get showFreeShippingBanner(): boolean {
    return this.remainingForFreeShipping > 0;
  }

  // ================= ACTIONS =================
  toggleShop(event: any) {
    const checked = event.target.checked;
    this.shop.selected = checked;
    this.products.forEach(p => p.selected = checked);
    this.allSelected = checked;
  }

  toggleItem() {
    this.allSelected = this.products.every(p => p.selected);
    this.shop.selected = this.allSelected;
  }

  
}
