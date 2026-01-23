import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, ProductCardDto } from '../../../services/product';

@Component({
  selector: 'app-product-grid-new',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.scss']
})
export class ProductGridComponent implements OnInit, OnChanges {
  @Input() filterData: any = {};
  @Input() products: any[] | null = null;

  allProducts: ProductCardDto[] = [];
  visibleProducts: ProductCardDto[] = [];

  visibleCount = 20;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    if (this.products && this.products.length > 0) {
      this.allProducts = this.products;
      this.applyFilters();
    } else {
      this.loadProducts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.allProducts = this.products;
      this.applyFilters();
    }
    if (changes['filterData']) {
      this.applyFilters();
    }
  }

  loadProducts() {
    if (this.products && this.products.length > 0) return;
    // Fetch generic cards or search-specific if API supported it.
    // Assuming getProductsForCards is the correct endpoint for listing.
    this.productService.getProductsForCards(0, 200).subscribe(res => {
      // res is { totalCount, items } or just items? 
      // ProductService.ts says: map(res => res.result) where res.result is { totalCount, items } ?
      // Wait, getProductsForCards in services/product.ts returns map(res => res.result).
      // Let's assume res.items exists if result is the object.
      // Need to be robust.
      const items = (res as any)?.items || (Array.isArray(res) ? res : []);
      this.allProducts = items;
      this.applyFilters();
    });
  }

  applyFilters() {
    if (!this.allProducts.length) return;

    let filtered = [...this.allProducts];

    // 1. Category Filter
    if (this.filterData.category) {
      const cat = this.filterData.category.toLowerCase();
      filtered = filtered.filter(p =>
        (p.categoryName && p.categoryName.toLowerCase().includes(cat)) ||
        (p.title && p.title.toLowerCase().includes(cat))
      );
    }

    // 2. Search Term
    if (this.filterData.search) {
      const term = this.filterData.search.toLowerCase();
      filtered = filtered.filter(p =>
        (p.title && p.title.toLowerCase().includes(term)) ||
        (p.storeName && p.storeName.toLowerCase().includes(term))
      );
    }

    // 3. Price Filter
    if (this.filterData.price) {
      filtered = filtered.filter(p => p.price >= this.filterData.price.min && p.price <= this.filterData.price.max);
    }

    // 4. Sort
    if (this.filterData.sort) {
      if (this.filterData.sort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (this.filterData.sort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      }
      // 'recommended' / 'newest' might be default or date based
    }

    this.visibleProducts = filtered.slice(0, this.visibleCount);
  }

  get showViewMore(): boolean {
    return this.visibleProducts.length < this.allProducts.length; // Simplified logic, ideally check against filtered length
  }

  viewMore() {
    this.visibleCount += 20;
    this.applyFilters(); // Re-slice
  }

  getFirstImage(product: ProductCardDto): string {
    if (product.image1) return product.image1;
    // Fallback if image1 is empty but image2 exists (unlikely but safe)
    if (product.image2) return product.image2;
    return 'assets/images/placeholder.png';
  }

  getSecondImage(product: ProductCardDto): string | null {
    return product.image2 || null;
  }
}

