import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-address.html',
  styleUrls: ['./shipping-address.scss']
})
export class ShippingAddress {

  // ===== FORM DATA =====
  fields: any = {
    location: '',
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    state: '',
    city: '',
    zip: ''
  };

  touched: any = {};
  focused: any = {};

  // ===== UI STATE =====
  showSummary = false;

  // ===== INPUT HANDLERS =====
  set(field: string, e: Event) {
    this.fields[field] = (e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
  }

  focus(field: string) {
    this.focused[field] = true;
  }

  blur(field: string) {
    this.focused[field] = false;
    this.touch(field);
  }

  touch(field: string) {
    this.touched[field] = true;
  }

  // ===== VALIDATION =====
  invalid(field: string): boolean {
    return this.touched[field] && !this.fields[field];
  }

  isInvalid(field: string): boolean {
    return this.touched[field] && !this.fields[field];
  }

  // ===== SUBMIT =====
  submit(e: Event) {
    e.preventDefault();

    // mark all touched
    Object.keys(this.fields).forEach(f => this.touched[f] = true);

    const valid = Object.values(this.fields).every(v => v);
    if (valid) {
      this.showSummary = true; // 🔥 form hide, summary show
    }
  }

  // ===== EDIT / CHANGE =====
  edit() {
    this.showSummary = false; // 🔥 summary hide, form show
  }
}
