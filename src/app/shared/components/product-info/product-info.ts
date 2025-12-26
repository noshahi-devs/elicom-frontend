import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.scss']
})
export class ProductInfo {
  // Dynamic Data (can be replaced with API later)
  title = "Women's Mid Rise Straight Leg Denim Pants - Non Stretch Classic Washed Button Fly Zipper";
  sku = "S225090998294825844";
  rating = 4;
  reviewCount = 1000;
  priceNow = 10.00;
  priceOld = 13.97;
  discount = 34;
  colors = [
    { src: 'assets/images/1.webp', name: 'Black', active: true },
    { src: 'assets/images/2.webp', name: 'Light Wash', hot: true },
    { src: 'assets/images/3.webp', name: 'Light Wash', hot: true },
    { src: 'assets/images/4.webp', name: 'Light Wash' }
  ];
  sizes = ['S', 'M', 'L', 'XL'];
  selectedSize: string = '';
  quantity = 1;
  fav = false;

  // Functions
  selectSize(size: string) { this.selectedSize = size; }
  toggleFav() { this.fav = !this.fav; }
  incrementQty() { this.quantity++; }
  decrementQty() { if(this.quantity > 1) this.quantity--; }
  addToCart() { alert(`Added ${this.quantity} item(s) of size ${this.selectedSize} to cart.`); }
}
