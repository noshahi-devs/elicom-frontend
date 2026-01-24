import { Component, Input, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, ProductCardDto } from '../../../services/product';
import { CartService } from '../../../services/cart';

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

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService // Inject
  ) { }

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

    // Using real API for product cards
    this.productService.getProductsForCards(0, 200).subscribe({
      next: (res: any) => {
        // Handle various response shapes robustly
        let items: ProductCardDto[] = [];
        if (Array.isArray(res)) {
          items = res;
        } else if (res && Array.isArray(res.items)) {
          items = res.items;
        } else if (res && Array.isArray(res.result)) {
          // fallback if result wrapper was not stripped by service
          items = res.result;
        }

        this.allProducts = items;
        this.applyFilters();
        this.cdr.detectChanges(); // Fix NG0100
      },
      error: (err) => {
        console.error('Failed to load products', err);
        // Fallback or empty state could be handled here
      }
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
      // Only filter if price range is explicitly set/changed from default
      // The default max is 6062, so if max is less, we filter.
      if (this.filterData.price.max < 6062 || this.filterData.price.min > 0) {
        filtered = filtered.filter(p => p.price >= this.filterData.price.min && p.price <= this.filterData.price.max);
      }
    }

    // 4. Sort
    if (this.filterData.sort) {
      if (this.filterData.sort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (this.filterData.sort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (this.filterData.sort === 'newest') {
        // Assuming there is a date field, or just by ID roughly if incremental
        // If no date field, we might skip or use randomness/mock
        // filtered.sort((a: any, b: any) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime());
      }
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

  getFirstImage(product: any): string {
    // 1. Get raw value from one of the possible fields
    let val = product.image1 || product.productImage || product.imageUrl || product.image2;
    // Use card_1.jpg as placeholder since placeholder.png is missing
    const fallback = 'assets/images/card_1.jpg';

    if (!val || val === 'string') return fallback;

    // 2. Handle comma-separated strings
    if (val && typeof val === 'string' && val.includes(',')) {
      val = val.split(',')[0]; // Take first
    }
    val = val ? val.trim() : '';
    if (!val) return fallback;

    // 3. Absolute vs Relative
    if (val.startsWith('http')) return val;

    // 4. Prepend Base URL
    const baseUrl = 'https://localhost:44311';

    if (!val.startsWith('/')) {
      if (val.indexOf('/') === -1) {
        return `${baseUrl}/images/products/${val}`;
      }
      return `${baseUrl}/${val}`;
    }

    return `${baseUrl}${val}`;
  }

  getSecondImage(product: any): string | null {
    let val = null;

    // source selection
    if (product.image2 && product.image2 !== product.image1) {
      val = product.image2;
    } else if (product.images && Array.isArray(product.images) && product.images.length > 1) {
      val = product.images[1];
    } else {
      // Check if primary field has multiple comma-separated
      const primary = product.image1 || product.productImage || product.imageUrl;
      if (primary && primary.includes(',')) {
        const parts = primary.split(',').map((s: string) => s.trim()).filter((s: string) => s);
        if (parts.length > 1) val = parts[1];
      }
    }

    if (!val || typeof val !== 'string') return null;

    // cleanup
    if (val.includes(',')) val = val.split(',')[0].trim();

    if (val.startsWith('http')) return val;

    const baseUrl = 'https://localhost:44311';
    if (!val.startsWith('/')) {
      if (val.indexOf('/') === -1) {
        return `${baseUrl}/images/products/${val}`;
      }
      return `${baseUrl}/${val}`;
    }
    return `${baseUrl}${val}`;
  }

  getTitle(product: any): string {
    return product.title || product.productName || product.name || 'Untitled Product';
  }

  handleImageError(event: any, product: any, type: string) {
    // Generate a simple hash from product ID or Title to pick a consistent random image
    const seed = (product.id || product.productId || product.title || 'default').toString();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    // We have card_1.jpg to card_8.jpg (approx)
    const totalCards = 8;
    const index = Math.abs(hash) % totalCards + 1; // 1 to 8

    let fallbackUrl = `assets/images/card_${index}.jpg`;

    // For hover image, use a different one (next index) to show valid hover effect
    if (type === 'hover') {
      const nextIndex = (index % totalCards) + 1;
      fallbackUrl = `assets/images/card_${nextIndex}.jpg`;
    }

    // Prevent infinite loop if fallback also fails (though unlikely for local assets)
    if (event.target.src.includes(fallbackUrl)) return;

    event.target.src = fallbackUrl;
  }

  // Add To Cart Logic
  addToCart(product: any, event: Event) {
    event.stopPropagation(); // prevent navigating to detail page

    // For grid, we usually don't have size/color selected, so we might send defaults or null
    // If logic requires size/color, we might need to open a Quick View modal instead.
    // For now assuming we can add base product.

    // Check if auth happens in service
    // We Subscribe to trigger execution
    // Inject CartService first (which I need to add to constructor)
    if (!this.cartService) {
      console.error('CartService not injected');
      return;
    }

    this.cartService.addToCart(product, 1).subscribe({
      next: () => console.log('Added to cart'),
      error: (err) => console.error('Error adding to cart', err)
    });
  }
}

