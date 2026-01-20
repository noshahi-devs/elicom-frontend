import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.scss',
})
export class PaymentMethod {

  // kis payment method par click hua (index)
  activeIndex: number | null = null;

  setActive(index: number) {
    this.activeIndex = index;
  }
}
