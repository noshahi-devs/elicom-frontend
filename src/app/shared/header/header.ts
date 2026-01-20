import { Component, signal, ElementRef, ViewChild, inject, effect, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  userDropdown = signal(false);
  cartDropdown = signal(false);
  globeDropdown = signal(false);

  cartService = inject(CartService);

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

  // QTY DROPDOWN LOGIC
  activeQtyDropdown: string | null = null;
  toggleQtyDropdown(item: CartItem) {
    const key = `${item.productId}-${item.size}-${item.color}`;
    this.activeQtyDropdown = this.activeQtyDropdown === key ? null : key;
  }

  setQty(item: CartItem, q: number) {
    this.cartService.updateQuantity(item.productId, item.size, item.color, q);
    this.activeQtyDropdown = null;
  }

  deleteItem(item: CartItem) {
    this.cartService.updateQuantity(item.productId, item.size, item.color, item.quantity - 1);
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

}
