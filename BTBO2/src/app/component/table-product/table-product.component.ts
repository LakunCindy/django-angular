import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../services/product.model';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent implements OnInit {

  products: Product[];
  product;
  productList;
  constructor(public productsService : ProductsService, private http: HttpClient) {
    this.product = [];
   }

  ngOnInit() {
    this.productsService.getData().subscribe(res => {
      this.products = res.body;
      this.getProducts();
    },
    (err) => {
      alert('failed loading json data');
    });    
  }

  getProducts(){
    for(let p of this.products){
        this.productList = p;         
    }
  }

}
