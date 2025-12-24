import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-gallery.html',
  styleUrls: ['./product-gallery.scss']
})
export class ProductGalleryComponent {

  @Input() images: string[] = [];
  selectedImage!: string;

  ngOnInit() {
    this.selectedImage = this.images[0];
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }
}
