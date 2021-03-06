import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../services/product.model';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  products: Product[];
  product;
  productList;
  afficherUpdateStock;
  quantityChange = 0;
  
  constructor(public productsService : ProductsService, private http: HttpClient) {
  }

  ngOnInit() {
    this.productsService.getData().subscribe(res => {
        this.products = res.body;
        this.getProducts();
        this.getProductId(6);
      },
      (err) => {
        alert('failed loading json data');
      });
  }

  getProductId(id){
    for(let p of this.products){
      if(p.id == id){
        this.afficherUpdateStock = false;
        this.product = p; 
      }   
    }
  }

  getProducts(){
    for(let p of this.products){
        this.productList = p;         
    }
  }

  addStock(quantityChange, product){
    product.quantity_stock = product.quantity_stock + quantityChange;
    this.getProductId(product.id);
    this.productsService.incrementProduct(product.id,quantityChange).subscribe(res => {
      console.log(res);
    },
    (err) => {
      alert('failed loading json data');
    });
  }
}
