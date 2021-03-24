import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsProductComponent } from './component/details-product/details-product.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { TableProductComponent } from './component/table-product/table-product.component';
import { LoginComponent } from './main/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { InterceptorService } from './services/interceptor-service.service'
import { StatsComponent } from './component/stats/stats.component';
import { YearGainComponent } from './component/sub-component/year-gain/year-gain.component';
import { MonthGainComponent } from './component/sub-component/month-gain/month-gain.component';
import { ContainerComponent } from './component/container/container.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DetailsProductComponent,
    HomeComponent,
    HeaderComponent,
    TableProductComponent,
    LoginComponent,
    StatsComponent,
    ProfileComponent,
    YearGainComponent,
    MonthGainComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true 
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
