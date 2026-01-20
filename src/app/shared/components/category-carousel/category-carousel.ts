import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category';

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-carousel.html',
  styleUrls: ['./category-carousel.scss']
})
export class CategoryCarouselComponent implements OnInit {

  categories: any[] = [];
  slides: any[][] = [];

  constructor(
    private adeel: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }
  currentSlide = 0;
  enableCarousel = false;

  // responsive vars
  itemsPerRow = 8;
  rows = 2;
  itemsPerSlide = 16;

  ngOnInit(): void {
    this.calculateLayout();
    this.loadMyCategories();
  }



  loadMyCategories() {
    console.group('Category Carousel Loading');
    // Switching to getAllCategories so ALL 21 categories show up
    this.adeel.getAllCategories().subscribe({
      next: (res) => {
        console.log('Carousel: Received All Categories. Count:', res.length);
        setTimeout(() => {
          this.categories = res || [];
          this.buildSlides();
          console.log('Carousel: Slides built. Total slides:', this.slides.length);
        }, 100);
        console.groupEnd();
      },
      error: (err) => {
        console.error('Carousel Category Error:', err);
        console.groupEnd();
      }
    });
  }



  /* 🔹 RESPONSIVE LOGIC */
  @HostListener('window:resize')
  calculateLayout() {
    const width = window.innerWidth;

    if (width < 480) {
      this.itemsPerRow = 2;
    } else if (width < 768) {
      this.itemsPerRow = 4;
    } else if (width < 1200) {
      this.itemsPerRow = 6;
    } else {
      this.itemsPerRow = 8;
    }

    this.itemsPerSlide = this.itemsPerRow * this.rows;

    this.buildSlides();
  }

  /* 🔹 SLIDE BUILDER */
  buildSlides() {
    this.slides = [];
    this.currentSlide = 0;

    for (let i = 0; i < this.categories.length; i += this.itemsPerSlide) {
      this.slides.push(
        this.categories.slice(i, i + this.itemsPerSlide)
      );
    }

    // 🔥 MAIN RULE
    this.enableCarousel = this.categories.length > this.itemsPerSlide;
  }

  getCategoryImage(cat: any): string {
    if (cat.imageUrl && cat.imageUrl !== 'string' && cat.imageUrl.includes('.')) {
      if (cat.imageUrl.startsWith('http')) return cat.imageUrl;
      if (cat.imageUrl === 'test.jpg' || cat.imageUrl === 'category.png') {
        return `https://picsum.photos/seed/${cat.name}/110/110`;
      }
      return `https://localhost:44311/images/products/${cat.imageUrl}`;
    }
    const seed = cat.id || cat.categoryId || cat.name || 'default';
    return `https://picsum.photos/seed/${seed}/110/110`;
  }

  next() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}
