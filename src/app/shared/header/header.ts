import { Component, signal, ElementRef, ViewChild, inject, effect, HostListener, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthModalComponent } from '../components/auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AuthModalComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements AfterViewChecked {
  userDropdown = signal(false);
  cartDropdown = signal(false);
  globeDropdown = signal(false);
  authModalOpen = signal(false); // Controls the Auth Modal visibility
  searchTerm = '';

  cartService = inject(CartService);
  searchService = inject(SearchService);
  authService = inject(AuthService); // Inject AuthService
  router = inject(Router);

  // currentUser signal derived from AuthService
  currentUser = this.authService.currentUser$;
  isAuthenticated = this.authService.isAuthenticated$;

  autoHideTimer: any;
  isHovered = false;

  constructor() {
    // Listen for new items added to cart to auto-open the modal
    effect(() => {
      const trigger = this.cartService.cartAutoOpen();
      if (trigger > 0) {
        this.openModal();
      }
    });

    // Listen to Auth Service requests to open modal
    // We subscribe manually since effect() is for signals, or we could use toSignal if we strictly wanted signals
    this.authService.showAuthModal$.subscribe(show => {
      if (show) this.authModalOpen.set(true);
    });
  }

  @ViewChild('navbar', { static: true })
  navbar!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close if click is outside cart-wrapper
    if (!target.closest('.cart-wrapper')) {
      this.cartDropdown.set(false);
      if (this.autoHideTimer) clearTimeout(this.autoHideTimer);
    }

    if (!target.closest('.currency-menu-wrapper')) {
      this.globeDropdown.set(false);
    }

    if (!target.closest('.user-menu-wrapper')) {
      this.userDropdown.set(false);
    }
  }

  ngAfterViewChecked() {
    // Set indeterminate state for store checkboxes
    this.getStores().forEach(storeName => {
      const checkbox = document.getElementById('store-' + storeName) as HTMLInputElement;
      if (checkbox) {
        const isPartiallyChecked = this.isAnyStoreItemChecked(storeName) && !this.isStoreChecked(storeName);
        checkbox.indeterminate = isPartiallyChecked;
      }
    });
  }

  openModal() {
    this.cartDropdown.set(true);
    this.startTimer();
  }

  closeModal() {
    this.cartDropdown.set(false);
    if (this.autoHideTimer) clearTimeout(this.autoHideTimer);
  }

  startTimer() {
    if (this.autoHideTimer) clearTimeout(this.autoHideTimer);
    this.autoHideTimer = setTimeout(() => {
      if (!this.isHovered) {
        this.cartDropdown.set(false);
      }
    }, 3000);
  }

  onMouseEnterCart() {
    this.isHovered = true;
    if (this.autoHideTimer) clearTimeout(this.autoHideTimer);
  }

  onMouseLeaveCart() {
    this.isHovered = false;
    this.startTimer();
  }

  incrementQty(item: CartItem) {
    this.cartService.updateQuantity(item.productId, item.size, item.color, item.quantity + 1);
  }

  decrementQty(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId, item.size, item.color, item.quantity - 1);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.productId, item.size, item.color);
  }

  scrollAmount = 200;

  scrollLeft() {
    const navbar = document.querySelector('.elicom-navbar');
    if (navbar) navbar.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    const navbar = document.querySelector('.elicom-navbar');
    if (navbar) navbar.scrollBy({ left: 200, behavior: 'smooth' });
  }

  // Checkbox handling methods
  onItemCheckboxChange(item: CartItem) {
    this.cartService.toggleItemCheckbox(item.productId, item.size, item.color);
  }

  onStoreCheckboxChange(storeName: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.cartService.toggleStoreCheckbox(storeName, checkbox.checked);
  }

  onAllCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.cartService.toggleAllCheckbox(checkbox.checked);
  }

  isStoreChecked(storeName: string): boolean {
    return this.cartService.isStoreChecked(storeName);
  }

  isAnyStoreItemChecked(storeName: string): boolean {
    return this.cartService.isAnyStoreItemChecked(storeName);
  }

  isAllChecked(): boolean {
    return this.cartService.isAllChecked();
  }

  getStores(): string[] {
    return this.cartService.getStores();
  }

  getItemsByStore(storeName: string): CartItem[] {
    return this.cartService.getItemsByStore(storeName);
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.searchService.setSearchTerm(this.searchTerm);
      this.router.navigate(['/search-result'], { queryParams: { q: this.searchTerm } });
    }
  }

  toggleUserMenu() {
    if (this.authService.isAuthenticated) {
      this.userDropdown.set(!this.userDropdown());
    } else {
      this.authModalOpen.set(true);
    }
  }

  logout() {
    this.authService.logout();
    this.userDropdown.set(false);
  }
}
