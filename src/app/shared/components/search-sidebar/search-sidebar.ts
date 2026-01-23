import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
    selector: 'app-search-sidebar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search-sidebar.html',
    styleUrl: './search-sidebar.scss'
})
export class SearchSidebar implements OnInit {
    // Collapse State
    collapsedSections: Record<string, boolean> = {};

    // View More State
    showMore = {
        category: false,
        size: false,
        details: false,
        pattern: false
    };

    // Filters
    selectedFilters: string[] = [];
    selectedFilterOption: string = 'recommended'; // Default filter dropdown
    searchTerm: string = '';

    @Input() isOpen: boolean = false;

    // Price Slider
    minPrice = 0;
    maxPrice = 6062;
    priceGap = 50;

    // Outputs
    @Output() filterChange = new EventEmitter<any>();

    constructor(private searchService: SearchService) { }

    ngOnInit() {
        this.searchService.searchTerm$.subscribe(term => {
            this.searchTerm = term;
            // Optionally trigger a filter update if the sidebar itself manages API calls, 
            // but likely it just displays the term.
        });
    }

    toggleSection(section: string) {
        this.collapsedSections[section] = !this.collapsedSections[section];
    }

    toggleViewMore(section: keyof typeof this.showMore) {
        this.showMore[section] = true;
    }

    /* ================= FILTERS ================= */

    onDropdownChange() {
        this.emitFilterChange();
    }

    // Handle Checkbox/Radio Changes
    onFilterChange(e: Event, type: 'checkbox' | 'radio') {
        const input = e.target as HTMLInputElement;
        const value = input.value;

        if (type === 'checkbox') {
            if (input.checked) {
                this.addChip(value);
            } else {
                this.removeChip(value);
            }
        } else {
            // Radio logic (Category)
            // If category matches what's in selectedFilters (if we track it there), remove old?
            // Ideally we just emit the category.
            // For now, add to chips for display consistency
            this.addChip(value);
        }
        this.emitFilterChange();
    }

    addChip(text: string) {
        if (!this.selectedFilters.includes(text)) {
            this.selectedFilters.push(text);
        }
    }

    removeChip(text: string) {
        this.selectedFilters = this.selectedFilters.filter(f => f !== text);

        // Uncheck input if it exists
        setTimeout(() => {
            const inputs = document.querySelectorAll(`input[value="${text}"]`);
            inputs.forEach((inp: any) => {
                inp.checked = false;
            });
            this.emitFilterChange();
        });
    }

    clearAll() {
        this.selectedFilters = [];
        this.resetPrice();
        this.selectedFilterOption = 'recommended';

        // Reset inputs
        setTimeout(() => {
            const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
            inputs.forEach((inp: any) => inp.checked = false);
            this.emitFilterChange();
        });
    }

    /* ================= PRICE ================= */

    onPriceChange() {
        if (this.minPrice > this.maxPrice - this.priceGap) {
            this.minPrice = this.maxPrice - this.priceGap;
        }
        if (this.maxPrice < this.minPrice + this.priceGap) {
            this.maxPrice = this.minPrice + this.priceGap;
        }
        this.emitFilterChange();
    }

    resetPrice() {
        this.minPrice = 0;
        this.maxPrice = 6062;
    }

    private emitFilterChange() {
        this.filterChange.emit({
            filters: this.selectedFilters,
            sort: this.selectedFilterOption,
            price: { min: this.minPrice, max: this.maxPrice },
            search: this.searchTerm
        });
    }
}
