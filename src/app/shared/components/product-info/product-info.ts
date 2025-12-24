import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.scss']
})
export class ProductInfoComponent {

  @Input() product: any;
  @Input() selectedColor: any;
  @Output() colorChange = new EventEmitter<any>();

  selectColor(color: any) {
    this.colorChange.emit(color);
  }
}
