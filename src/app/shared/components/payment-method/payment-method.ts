import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.scss',
})
export class PaymentMethod {

  // kis payment method par click hua (index)
  activeIndex: number | null = null;
  showLoginModal = false;
  showCardModal = false;
  isPayPal = false;
  selectedLabel = '';

  setActive(index: number, label: string) {
    this.activeIndex = index;
    this.selectedLabel = label;
    this.isPayPal = label.toLowerCase().includes('paypal');

    // Open login modal for any bank/payment selection
    this.showLoginModal = true;
  }

  onLoginSuccess() {
    this.showLoginModal = false;
    if (this.isPayPal) {
      const paypalUrl = "https://www.paypal.com/checkoutweb/signup?atomic-event-state=eyJkb21haW4iOiJzZGtfcGF5cGFsX3Y1IiwiZXZlbnRzIjpbXSwiaW50ZW50IjoiY2xpY2tfcGF5bWVudF9idXR0b24iLCJpbnRlbnRUeXBlIjoiY2xpY2siLCJpbnRlcmFjdGlvblN0YXJ0VGltZSI6OTA5OC42OTk5OTk5ODgwNzksInRpbWVTdGFtcCI6OTA5OSwidGltZU9yaWdpbiI6MTc2OTAwMTk1NTk4MC45LCJ0YXNrIjoic2VsZWN0X29uZV90aW1lX2NoZWNrb3V0IiwiZmxvdyI6Im9uZS10aW1lLWNoZWNrb3V0IiwidWlTdGF0ZSI6IndhaXRpbmciLCJwYXRoIjoiL3NtYXJ0L2J1dHRvbnMiLCJ2aWV3TmFtZSI6InBheXBhbC1zZGsifQ%3D%3D&sessionID=uid_b6f4d2e68d_mtm6mta6ntk&buttonSessionID=uid_2ab5897f57_mtm6mju6ntu&stickinessID=uid_3a5f13d12e_mtm6mte6mda&smokeHash=&sign_out_user=false&fundingSource=paypal&buyerCountry=PK&locale.x=en_US&commit=true&client-metadata-id=uid_b6f4d2e68d_mtm6mta6ntk&standaloneFundingSource=paypal&branded=true&token=EC-5F729672B4790424D&clientID=ATfsWpl9MqZR-8lezNp9wu-FqI65bbB7qHIFOqqMeLxBOifGa5VLNGg4kAibsmbHmR5ZU2Ao7oV0_zfL&env=production&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWwuY29tL3Nkay9qcz9jb21wb25lbnRzPWJ1dHRvbnMlMkNtZXNzYWdlcyZpbnRlbnQ9Y2FwdHVyZSZjdXJyZW5jeT1VU0QmY2xpZW50LWlkPUFUZnNXcGw5TXFaUi04bGV6TnA5d3UtRnFJNjViYkI3cUhJRk9xcU1lTHhCT2lmR2E1VkxOR2c0a0FpYnNtYkhtUjVaVTJBbzdvVjBfemZMIiwiYXR0cnMiOnsiZGF0YS11aWQiOiJ1aWRfbGxvb2R4aHRoeHZuaGxkZHdrbWVqdnFxbXlhcXRwIn19&country.x=US&xcomponent=1&integration_artifact=PAYPAL_JS_SDK&version=5.0.526&hasShippingCallback=false&ssrt=1769001971888&rcache=1&useraction=CONTINUE&cookieBannerVariant=hidden&locale.x=en_US&country.x=US";
      window.open(paypalUrl, '_blank', 'width=500,height=700');
      // After opening PayPal, show card info modal as requested
      setTimeout(() => {
        this.showCardModal = true;
      }, 1000);
    } else {
      this.showCardModal = true;
    }
  }

  closeModals() {
    this.showLoginModal = false;
    this.showCardModal = false;
  }
}
