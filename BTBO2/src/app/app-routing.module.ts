import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  { path: 'detailsProduct', component: DetailsProductComponent, outlet: 'main'},
  { path: 'home', component: HomeComponent, outlet: 'main'},
  { path: 'tableProduct', component: TableProductComponent, outlet: 'main'},
  { path: 'stats', component: StatsComponent, outlet: 'main'},
  { path: '', redirectTo:'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
  { path: 'yeargain', component: YearGainComponent, outlet : 'sub'},
  { path: 'monthgain', component: MonthGainComponent, outlet : 'sub'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
