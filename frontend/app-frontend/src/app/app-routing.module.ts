import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { GoodItemComponent } from './components/pages/good-item/good-item.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'good/:id', component: GoodItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
