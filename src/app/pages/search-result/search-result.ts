import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchSidebar } from '../../shared/components/search-sidebar/search-sidebar';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchSidebar, ProductGridComponent],
  templateUrl: './search-result.html',
  styleUrl: './search-result.scss',
})
export class SearchResult implements OnInit {
  filterData: any = {};
  categoryTitle: string = '';
  isSidebarOpen: boolean = false;

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['cat']) {
        this.categoryTitle = params['cat'];
        this.searchService.setSearchTerm(this.categoryTitle);
      }
    });

    this.route.queryParams.subscribe(params => {
      // handle query params if any
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onFilterChange(event: any) {
    this.filterData = { ...this.filterData, ...event };
    // Keep category if not overwritten
    if (!this.filterData.category && this.categoryTitle) {
      this.filterData.category = this.categoryTitle;
    }
  }

  /* SORTING Logic */
  showSortDropdown = false;

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  onSortChange(value: string) {
    this.filterData = { ...this.filterData, sort: value };
    this.showSortDropdown = false;
  }

  getSortLabel(value: string): string {
    const map: any = {
      'recommended': 'Recommended',
      'newest': 'Newest',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low'
    };
    return map[value] || 'Recommended';
  }
}
