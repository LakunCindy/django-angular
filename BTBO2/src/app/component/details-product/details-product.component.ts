import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../services/product.model';

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
  quantityChange:number = 0;
  afficherUpdatePromo;
  
  constructor(public productsService : ProductsService, private http: HttpClient) {
  }

  ngOnInit() {
    this.productsService.getData().subscribe(res => {
        this.products = res.body;
        //this.getProducts();
        this.getProductId(12);
        this.productList = this.products[0]
      },
      (err) => {
        alert('failed loading json data');
      });
  }

  getProductId(id:number){
    if(id)
    {
      this.productsService.infoStockProduct(id).subscribe(res => {
        this.product = res.body;
        this.afficherUpdateStock = false;
        this.afficherUpdatePromo = false;
      },
      (err) => {
        alert(err.error);
      });
    }

  }

  // getProducts(){
  //   for(let p of this.products){
  //       this.productList = p;     
  //       this.quantityChange = p.quantity   
  //   }
  // }

  addStock(quantityChange, product){
    if(parseFloat(quantityChange))
    {
      this.productsService.incrementProduct(product.id,quantityChange).subscribe(res => {
        console.log(res);
      },
      (err) => {
        alert(err.error);
      });
    }else{
      alert("Veuillez vérifier la saisie de votre quantité.");
    }
  }

  deleteStock(quantityChange, product){
    if(parseFloat(quantityChange))
    {
      this.productsService.decrementProduct(product.id,quantityChange).subscribe(res => {
        console.log(res);
      },
      (err) => {
        alert(err.error);
      });
    }else{
      alert("Veuillez vérifier la saisie de votre quantité.");
    }
  }
}
