import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsProductComponent } from './component/details-product/details-product.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: 'detailsProduct', component: DetailsProductComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
