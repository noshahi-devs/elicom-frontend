import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductComponent } from './pages/product/product';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  }
];
