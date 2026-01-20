import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.scss']
})
export class ProductGridComponent implements OnChanges {

  @Input() products: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      console.log('ProductGrid: products input changed. Length:', this.products.length);
    }
  }

  visibleCount = 25;

  get visibleProducts(): any[] {
    return this.products.slice(0, this.visibleCount);
  }

  get showViewMore(): boolean {
    return this.products.length > this.visibleCount;
  }

  viewMore() {
    this.visibleCount += 25;
  }

  getFirstImage(imageStr: string): string {
    if (!imageStr || imageStr === 'string' || imageStr.trim() === '') {
      return 'https://picsum.photos/seed/product/300/400';
    }
    let img = imageStr.split(',')[0].trim();
    if (img === 'string' || img === '') {
      return 'https://picsum.photos/seed/product/300/400';
    }

    // Check if it's a broken test CDN
    if (img.includes('cdn.elicom.com')) {
      return 'https://picsum.photos/seed/fashion/300/400';
    }

    if (!img.startsWith('http')) {
      return `https://localhost:44311/images/products/${img}`;
    }
    return img;
  }

  getSecondImage(imageStr: string): string {
    if (!imageStr || imageStr === 'string' || imageStr.trim() === '') {
      return '';
    }
    const parts = imageStr.split(',');
    if (parts.length > 1) {
      let img = parts[1].trim();
      if (img === 'string' || img === '' || img.includes('cdn.elicom.com')) return '';
      if (!img.startsWith('http')) {
        return `https://localhost:44311/images/products/${img}`;
      }
      return img;
    }
    return '';
  }
}
