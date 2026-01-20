import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb';
import { ProductGallery } from '../../shared/components/product-gallery/product-gallery';
import { ProductInfo } from '../../shared/components/product-info/product-info';
import { ProductService, ProductDetailDto } from '../../services/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    Breadcrumb,
    ProductGallery,
    ProductInfo
  ],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail implements OnInit {

  productData?: ProductDetailDto;
  breadcrumbItems: string[] = ['Home'];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['productId'];
      const storeProductId = params['storeProductId'];
      if (productId && storeProductId) {
        this.loadProductDetail(productId, storeProductId);
      }
    });
  }

  loadProductDetail(productId: string, storeProductId: string) {
    this.productService.getProductDetail(productId, storeProductId).subscribe({
      next: (res) => {
        this.productData = res;
        this.breadcrumbItems = ['Home', res.category.name, res.title];
      },
      error: (err) => {
        console.error('Error fetching product details', err);
      }
    });
  }

}
