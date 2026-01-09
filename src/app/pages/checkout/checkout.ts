import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProcessHeader } from '../../shared/components/order-process-header/order-process-header';
import { OrderProcessBreadcrumb } from '../../shared/components/order-process-breadcrumb/order-process-breadcrumb';
import { ShippingAddress } from '../../shared/components/shipping-address/shipping-address';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,OrderProcessHeader,OrderProcessBreadcrumb,ShippingAddress],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  showTopBar: boolean = true;


ngOnInit(): void {
this.getTopBarStatus();
}


getTopBarStatus() {
// API response example
const apiResponse = {
showBanner: true // false => hide bar
};


this.showTopBar = apiResponse.showBanner;
}
}
 