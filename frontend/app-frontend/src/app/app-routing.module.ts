import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { GoodItemComponent } from './components/pages/good-item/good-item.component';
import { StoreLocationComponent } from './components/pages/store-location/store-location.component';
import { TrendsComponent } from './components/pages/trends/trends.component';
import { CartComponent } from './components/pages/cart/cart.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'good/:id', component: GoodItemComponent},
  {path: 'store-location', component: StoreLocationComponent},
  {path: 'trends', component: TrendsComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
