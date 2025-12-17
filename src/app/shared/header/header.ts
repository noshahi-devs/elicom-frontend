import { Component, signal, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  userDropdown = signal(false);
  cartDropdown = signal(false);
  globeDropdown = signal(false);

 @ViewChild('navbar', { static: true })
navbar!: ElementRef<HTMLElement>;

scrollAmount = 200;

scrollLeft() {
  this.navbar.nativeElement.scrollBy({
    left: -this.scrollAmount,
    behavior: 'smooth'
  });
}

scrollRight() {
  this.navbar.nativeElement.scrollBy({
    left: this.scrollAmount,
    behavior: 'smooth'
  });
}

}
