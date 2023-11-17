import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { GoodItemComponent } from './components/pages/good-item/good-item.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { MapComponent } from './components/shared/map/map.component';
import { StoreLocationComponent } from './components/pages/store-location/store-location.component';
import { MapTooltipComponent } from './components/shared/map/map-tooltip/map-tooltip.component';
import { TrendsComponent } from './components/pages/trends/trends.component';
import { ChartComponent } from './components/shared/charts/chart/chart.component';
import { CartComponent } from './components/pages/cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    GoodItemComponent,
    LoadingComponent,
    MapComponent,
    StoreLocationComponent,
    MapTooltipComponent,
    TrendsComponent,
    ChartComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClarityModule,
    CommonModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
