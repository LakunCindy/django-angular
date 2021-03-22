import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsProductComponent } from './component/details-product/details-product.component';
import { HomeComponent } from './component/home/home.component';
import { StatsComponent } from './component/stats/stats.component';
import { TableProductComponent } from './component/table-product/table-product.component'

const routes: Routes = [
  { path: 'detailsProduct', component: DetailsProductComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tableProduct', component: TableProductComponent},
  { path: 'stats', component: StatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
