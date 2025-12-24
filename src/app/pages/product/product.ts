import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGalleryComponent } from '../../shared/components/product-gallery/product-gallery';
import { ProductInfoComponent } from '../../shared/components/product-info/product-info';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductGalleryComponent,
    ProductInfoComponent
  ],
  templateUrl: './product.html',
  styleUrls: ['./product.scss']
})
export class ProductComponent {

  product = {
    id: 1,
    title: 'Women Casual Dress',
    price: 29.99,
    discount: 20,
    colors: [
      {
        name: 'Red',
        code: '#d32f2f',
        images: [
          'assets/images/red1.jpg',
          'assets/images/red2.jpg',
          'assets/images/red3.jpg'
        ]
      },
      {
        name: 'Blue',
        code: '#1976d2',
        images: [
          'assets/images/blue1.jpg',
          'assets/images/blue2.jpg',
          'assets/images/blue3.jpg'
        ]
      }
    ]
  };

  selectedColor = this.product.colors[0];

  onColorChange(color: any) {
    this.selectedColor = color;
  }
}
