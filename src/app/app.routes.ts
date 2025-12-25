import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductDetailComponent } from './pages/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-detail', component: ProductDetailComponent }
];
