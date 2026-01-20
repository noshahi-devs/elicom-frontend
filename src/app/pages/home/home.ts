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
    this.productService.getGlobalMarketplaceProducts().subscribe({
      next: (res: GlobalMarketplaceProduct[]) => {
        console.log('HomeComponent: Products received:', res.length);
        this.products = res;
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
