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

  focus(field: string) {
    this.focused[field] = true;
  }

  blur(field: string) {
    this.focused[field] = false;
    this.touch(field);
  }

  set(field: string, e: Event) {
    const value = (e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
    this.fields[field] = value;
  }

  setValue(field: string, e: Event) {
    this.fields[field] = (e.target as HTMLInputElement).value;
  }

  touch(field: string) {
    this.touched[field] = true;
  }

  invalid(field: string): boolean {
    return this.touched[field] && !this.fields[field];
  }

  isInvalid(field: string): boolean {
    return this.touched[field] && !this.fields[field];
  }

  submit(e: Event) {
    e.preventDefault();
    Object.keys(this.fields).forEach(f => this.touched[f] = true);
  }
}