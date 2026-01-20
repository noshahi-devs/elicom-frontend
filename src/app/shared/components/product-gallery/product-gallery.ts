import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailDto } from '../../../services/product';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-gallery.html',
  styleUrls: ['./product-gallery.scss']
})
export class ProductGallery implements OnInit {

  @Input() productData?: ProductDetailDto;

  images: string[] = [];

  activeIndex = 0;

  ngOnInit(): void {
    if (this.productData && this.productData.images) {
      this.images = this.productData.images;
    }
  }

  selectImage(index: number) {
    this.activeIndex = index;
  }

  prevImage() {
    this.activeIndex =
      (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.activeIndex =
      (this.activeIndex + 1) % this.images.length;
  }
}
