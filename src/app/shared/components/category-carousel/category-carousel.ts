import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  myCategories: any[] = [];
  slides: any[][] = [];

  constructor(private adeel: CategoryService) { }
  currentSlide = 0;
  enableCarousel = false;

  // responsive vars
  itemsPerRow = 8;
  rows = 2;
  itemsPerSlide = 16;

  ngOnInit(): void {
    this.loadCategories();
    this.calculateLayout();
    this.loadMyCategories();
  }

  /* 🔹 TEMP DATA (API later) */
  loadCategories() {
    this.myCategories = Array.from({ length: 40 }).map((_, i) => ({
      id: i + 1,
      name: `Category ${i + 1}`,
      image: `https://i.pravatar.cc/150?img=${i + 1}`
    }));
  }



  loadMyCategories() {
    this.adeel.getAllCategories().subscribe({
      next: (res) => {
        console.log('API Response:', res);
        // res is already the array of items
        this.categories = res;
        console.log('My Categories:', this.categories);
      },
      error: (err) => {
        console.error('API Error:', err);
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
