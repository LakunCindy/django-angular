import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './component/container/container.component';
import { DetailsProductComponent } from './component/details-product/details-product.component';
import { HomeComponent } from './component/home/home.component';
import { StatsComponent } from './component/stats/stats.component';
import { TableProductComponent } from './component/table-product/table-product.component'
import { LoginComponent } from './main/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { YearGainComponent } from './component/sub-component/year-gain/year-gain.component';
import { MonthGainComponent } from './component/sub-component/month-gain/month-gain.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'container', component: ContainerComponent,
      children: [
      { path: 'detailsProduct', component: DetailsProductComponent},
      { path: 'home', component: HomeComponent},
      { path: 'tableProduct', component: TableProductComponent},
      { path: 'stats', component: StatsComponent,
          children : [
            { path: 'yeargain', component: YearGainComponent},
            { path: 'monthgain', component: MonthGainComponent}
          ]}
    ]
  },
  { path: '', redirectTo:'login', pathMatch: 'full'}, 
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
