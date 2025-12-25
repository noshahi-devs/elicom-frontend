import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb';
import { ProductGallery } from '../../shared/components/product-gallery/product-gallery';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    Breadcrumb,
    ProductGallery
  ],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetailComponent {

  breadcrumbItems = [
    'Home',
    'Women Apparel',
    'Women Jeans',
    'Black Skinny Jeans'
  ];

}
