import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-summary.html',
  styleUrl: './checkout-summary.scss',
})
export class CheckoutSummary {
  cartService = inject(CartService);

  get itemsCount(): number {
    return this.cartService.items()
      .filter(item => item.isChecked)
      .reduce((acc, item) => acc + item.quantity, 0);
  }

  /** Retail Price = Total of (oldPrice or price) * quantity for checked items */
  get retailPrice(): number {
    return this.cartService.items()
      .filter(p => p.isChecked)
      .reduce((sum, p) => sum + (p.oldPrice || p.price) * p.quantity, 0);
  }

  /** Estimated Price = Total of (price * quantity) for checked items */
  get estimatedPrice(): number {
    return this.cartService.totalPrice;
  }

  /** Promotions/Discount = Difference between retail price and estimated price */
  get totalSavings(): number {
    return Math.max(this.retailPrice - this.estimatedPrice, 0);
  }

  shippingFee: number = 0.00; // Free for now or use logic
  salesTax: number = 0.00;    // Simpler for now
  coupons: number = 0.00;

  onTimeDeliveryText: string = 'FREE';

  get orderTotal(): number {
    return this.estimatedPrice + this.shippingFee + this.salesTax - this.coupons;
  }

  /* ================= CLUB AD (HARD CODED FOR NOW) ================= */

  showClubBox: boolean = true; // 🔥 show / hide control

  clubData = {
    title: '🟧 Starshipper CLUB',
    benefitsText: 'All benefits stackable',
    saveText: 'Save $0.52 after joining >',
    shippingCoupons: '3× Shipping Coupons',
    creditText: '📉 3%–10% Credit…',
    freeGifts: '🎁 3 Free Gifts',
    extraOff: '⭐ Extra 5% OFF',
    markdownText: 'Membership Markdown: $7.00',
    price: 2.99,
    oldPrice: 9.99,
    specialOfferText: 'Special Offer $7.00 OFF >',
  };

  toggleClubBox() {
    this.showClubBox = !this.showClubBox;
  }
}
