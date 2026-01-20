import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-summary.html',
  styleUrl: './checkout-summary.scss',
})
export class CheckoutSummary {

  /* ================= ORDER SUMMARY ================= */

  itemsCount: number = 1;
  retailPrice: number = 10.47;
  shippingFee: number = 3.89;
  coupons: number = 8.32;
  promotions: number = 3.5;
  salesTax: number = 1.91;
  onTimeDeliveryText: string = 'FREE';

  get orderTotal(): number {
    return (
      this.retailPrice +
      this.shippingFee +
      this.salesTax -
      this.coupons -
      this.promotions
    );
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
