import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCarouselComponent } from '../../shared/components/hero-carousel/hero-carousel';
import { CategoryCarouselComponent } from '../../shared/components/category-carousel/category-carousel';
import { DealCardComponent } from '../../shared/components/deal-card/deal-card';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid';
import { ProductService, GlobalMarketplaceProduct } from '../../services/product';
import { CategoryService, Category } from '../../services/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroCarouselComponent,
    CategoryCarouselComponent,
    DealCardComponent,
    ProductGridComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

  products: GlobalMarketplaceProduct[] = [];
  categoriesDebug: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    console.log('HomeComponent: Loading products...');
    // Using getProductsForCards to fetch all products as requested ("sary product")
    this.productService.getProductsForCards(0, 50).subscribe({
      next: (res: any) => {
        // Handle response robustly (checking result/items)
        let items: any[] = [];
        if (Array.isArray(res)) items = res;
        else if (res && Array.isArray(res.items)) items = res.items;
        else if (res && Array.isArray(res.result)) items = res.result;

        console.log('HomeComponent: Products received:', items.length);
        this.products = items;
        this.cdr.detectChanges(); // Trigger immediately
      },
      error: (err: any) => {
        console.error('HomeComponent: Products error:', err);
      }
    });
  }

  loadCategories() {
    console.log('HomeComponent: Loading categories...');
    this.categoryService.getAllCategories().subscribe((res: any[]) => {
      console.log('HomeComponent: Debug Categories received:', res.length);
      this.categoriesDebug = res;
      this.cdr.detectChanges(); // Trigger immediately
    });
  }
}
