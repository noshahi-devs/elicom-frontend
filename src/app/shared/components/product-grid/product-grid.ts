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

  getFirstImage(product: any): string {
    const imageStr = product.productImage;
    const name = (product.productName || '').toLowerCase();

    // Specific Overrides for broken data
    if (name.includes('hair removel') || name.includes('hair removal')) {
      return 'https://picsum.photos/seed/beauty1/300/400';
    }
    if (name.includes('laptop bag')) {
      return 'https://picsum.photos/seed/bag1/300/400';
    }

    if (!imageStr || imageStr === 'string' || imageStr.trim() === '') {
      return `https://picsum.photos/seed/${product.id}/300/400`;
    }

    const img = imageStr.split(',')[0].trim();
    if (img === 'string' || img === '') return `https://picsum.photos/seed/${product.id}/300/400`;

    if (img.includes('cdn.elicom.com')) {
      const seed = img.split('/').pop() || 'p1';
      return `https://picsum.photos/seed/${seed}/300/400`;
    }

    if (!img.startsWith('http')) {
      return `https://localhost:44311/images/products/${img}`;
    }
    return img;
  }

  getSecondImage(product: any): string {
    const imageStr = product.productImage;
    const name = (product.productName || '').toLowerCase();

    // Specific Overrides for hover
    if (name.includes('hair removel') || name.includes('hair removal')) {
      return 'https://picsum.photos/seed/beauty2/300/400';
    }
    if (name.includes('laptop bag')) {
      return 'https://picsum.photos/seed/tech-bag/300/400';
    }

    if (!imageStr || imageStr === 'string' || imageStr.trim() === '') {
      // Force a hover image even for empty ones for better UX
      return `https://picsum.photos/seed/${product.id}_hover/300/400`;
    }

    const parts = imageStr.split(',').map((p: any) => p.trim()).filter((p: any) => p !== '' && p !== 'string');

    if (parts.length > 1) {
      const img = parts[1];
      if (img.includes('cdn.elicom.com')) {
        const seed = img.split('/').pop() || 'p2';
        return `https://picsum.photos/seed/${seed}/300/400`;
      }
      if (!img.startsWith('http')) {
        return `https://localhost:44311/images/products/${img}`;
      }
      return img;
    }

    // Fallback hover for single-image products
    const firstImg = parts[0] || '';
    const seed = (firstImg.includes('http') ? (firstImg.split('/').pop() || 'px') : firstImg) + '_hover';
    return `https://picsum.photos/seed/${seed}/300/400`;
  }
}
