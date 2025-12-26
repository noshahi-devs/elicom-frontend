import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-detail', component: ProductDetail }
];
