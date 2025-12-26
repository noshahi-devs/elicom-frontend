import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.scss']
})
export class ProductInfo implements OnInit {

  // ✅ PRODUCT DATA (API se baad me ayega)
  product = {
    title: "Women's Mid Rise Straight Leg Denim Pants - Non Stretch Classic Washed Button Fly Zipper",
    description: 'Premium quality denim pants',
    sku: 'S225090998294825844',
    reviewCount: 1000,
    priceNow: 10.00,
    priceOld: 13.97,
    discount: 34
  };

  rating = 4;

  colors = [
    { src: 'assets/images/1.webp', name: 'Black', active: true },
    { src: 'assets/images/2.webp', name: 'Red', active: false, hot: true },
    { src: 'assets/images/3.webp', name: 'Dark Grey', active: false }
  ];

  selectedColorName: string = 'Black';

  selectColor(selected: any) {
    this.colors.forEach(color => color.active = false);
    selected.active = true;
    this.selectedColorName = selected.name;
  }

  sizes = ['S', 'M', 'L', 'XL'];
  selectedSize = '';
  quantity = 1;
  fav = false;

  // ✅ AD SLOT (API se null ya object)
  adBanner: {
    text: string;
    brand: string;
  } | null = null;

  ngOnInit(): void {

    // 🔹 SIMULATE API RESPONSE
    this.adBanner = {
      text: 'Pay now, in 4 payments of $4.46, or pay over time with monthly financing.',
      brand: 'Klarna'
    };

    // ❌ agar API ad na bheje:
    // this.adBanner = null;
  }

  // METHODS
  selectSize(size: string) {
    this.selectedSize = size;
  }

  toggleFav() {
    this.fav = !this.fav;
  }

  incrementQty() {
    this.quantity++;
  }

  decrementQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    alert(`Added ${this.quantity} item(s) of size ${this.selectedSize}`);
  }
}
