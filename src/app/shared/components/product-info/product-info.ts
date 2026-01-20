import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailDto } from '../../../services/product';

export type AccordionType = 'desc' | 'sizefit' | null;
export type SizeTabType = 'product' | 'body';

interface Feature {
  icon: string;
  label: string;
}

interface Detail {
  key: string;
  value: string;
}

interface SizeRow {
  eu: string;
  size: string;
  length: number;
  waist: number;
  hip: number;
  inseam?: number;
}

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.scss']
})

export class ProductInfo implements OnInit {

  @Input() productData?: ProductDetailDto;

  product = {
    title: "",
    description: '',
    sku: '',
    reviewCount: 0,
    priceNow: 0,
    priceOld: 0,
    discount: 0
  };

  rating = 5;

  // COLORS
  colors: any[] = [];
  selectedColorName: string = '';

  selectColor(selected: any) {
    this.colors.forEach(c => c.active = false);
    selected.active = true;
    this.selectedColorName = selected.name;
  }

  // SIZES
  sizes: string[] = [];
  selectedSize: string = '';

  // QTY & FAV
  quantity = 1;
  fav = false;

  // AD SLOT (API se aa sakta hai ya null)
  adBanner: { text: string; brand: string } | null = null;

  ngOnInit(): void {
    if (this.productData) {
      this.product = {
        title: this.productData.title,
        description: this.productData.description,
        sku: this.productData.productId.substring(0, 8), // just a dummy SKU part
        reviewCount: 1250, // Hardcoded for demo
        priceNow: this.productData.store.price,
        priceOld: this.productData.store.resellerPrice,
        discount: this.productData.store.resellerDiscountPercentage
      };

      if (this.productData.colorOptions) {
        this.colors = this.productData.colorOptions.map((c, i) => ({
          name: c,
          active: i === 0
        }));
        this.selectedColorName = this.colors[0]?.name;
      }

      if (this.productData.sizeOptions) {
        this.sizes = this.productData.sizeOptions;
      }

      this.shippingData.seller.name = this.productData.store.storeName;
      this.details[11].value = this.product.sku;
      this.details[8].value = this.selectedColorName;
    }

    this.adBanner = {
      text: 'Pay now, in 4 payments of $' + (this.product.priceNow / 4).toFixed(2) + ', or pay over time with monthly financing.',
      brand: 'Klarna'
    };
  }

  // METHODS
  selectSize(size: string) {
    this.selectedSize = size;
  }

  toggleFav() {
    this.fav = !this.fav;
  }

  incrementQty() {
    this.quantity++;
  }

  decrementQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    alert(`Added ${this.quantity} item(s) of size ${this.selectedSize}`);
  }

  shippingData = {
    location: 'Phoenix, ARIZONA, United States',

    shipping: {
      free: true,
      minOrder: 29,
      estimatedFrom: 'Dec 3',
      estimatedTo: 'Dec 9',
      onTimePercentage: 73
    },

    returnPolicy: {
      freeReturn: true,
      days: 7
    },

    security: {
      safePayments: true,
      privacyProtection: true
    },

    seller: {
      name: 'Noshahi Essence',
      fulfilledBy: 'Noshahi'
    }
  };

  // Accordion initially closed
  activeAccordion: 'desc' | 'sizefit' | null = null;

  toggleAccordion(section: 'desc' | 'sizefit') {
    this.activeAccordion = this.activeAccordion === section ? null : section;
  }

  // ---------- DESCRIPTION DATA ----------
  features: Feature[] = [
    { icon: 'assets/images/comportable.png', label: 'Comfortable' },
    { icon: 'assets/images/breathabla.png', label: 'Breathable' },
    { icon: 'assets/images/soft.png', label: 'Soft' },
    { icon: 'assets/images/skin friendly.png', label: 'Skin-friendly' }
  ];

  elasticity = {
    icon: 'assets/images/aerro.png',
    text: 'Medium Stretch'
  };

  details: Detail[] = [
    { key: 'Occasion', value: 'Daily' },
    { key: 'Festivals', value: 'Independence Day' },
    { key: 'Details', value: 'Button, Pocket, Raw Hem, Ripped, Zipper' },
    { key: 'Lined For Added Warmth', value: 'No' },
    { key: 'Pattern Type', value: 'Plain' },
    { key: 'Style', value: 'Casual' },
    { key: 'Closure Type', value: 'Zipper Fly' },
    { key: 'Body', value: 'Unlined' },
    { key: 'Color', value: 'Black' },
    { key: 'Type', value: 'Skinny' },
    { key: 'Jeans Style', value: 'Curvy' },
    { key: 'SKU', value: 'S225090998294825844' }
  ];

  // ---------- SIZE & FIT ----------
  countries = ['EU', 'BR', 'DE', 'AU', 'SG', 'UK', 'JP', 'MX', 'IT', 'FR', 'US', 'ES'];
  selectedCountry: string = 'EU';

  modelInfo = {
    size: 'S (EU: 36)',
    height: 66.9,
    bust: 34.3,
    waist: 26.4,
    hips: 42.1,
    image: 'https://i.pravatar.cc/100?img=5'
  };

  // Tabs
  activeTab: 'product' | 'body' = 'product';

  // Tables
  productTable: SizeRow[] = [
    { eu: '34', size: 'XS', length: 36.2, waist: 24.4, hip: 32.7, inseam: 13 },
    { eu: '36', size: 'S', length: 36.6, waist: 26, hip: 34.3, inseam: 14 },
    { eu: '38', size: 'M', length: 37, waist: 27.6, hip: 35.8, inseam: 15 },
    { eu: '40/42', size: 'L', length: 37.6, waist: 29.9, hip: 38.2, inseam: 16 }
  ];

  bodyTable: SizeRow[] = [
    { eu: '34', size: 'XS', length: 36.2, waist: 24.4, hip: 32.7 },
    { eu: '36', size: 'S', length: 36.6, waist: 26, hip: 34.3 },
    { eu: '38', size: 'M', length: 37, waist: 27.6, hip: 35.8 },
    { eu: '40/42', size: 'L', length: 37.6, waist: 29.9, hip: 38.2 }
  ];

  // Methods
  changeCountry(c: string) {
    this.selectedCountry = c;
    // TODO: API call or logic to update productTable/bodyTable based on country
  }

  switchTab(tab: 'product' | 'body') {
    this.activeTab = tab;
  }

}
