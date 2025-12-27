import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  phoneNumber: string = '';
  selectedCountryCode: string = '+92'; // default

  countries = [
    { name: 'Afghanistan', code: '+93' },
    { name: 'Albania', code: '+355' },
    { name: 'Algeria', code: '+213' },
    { name: 'Pakistan', code: '+92' },
    { name: 'India', code: '+91' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    // ... baki countries
  ];

  updatePhoneCode(event: any) {
    const code = event.target.value;
    this.phoneNumber = code; // input field me sirf code update
  }

  onPhoneInput(event: any) {
    this.phoneNumber = event.target.value; // user input update
  }
}
