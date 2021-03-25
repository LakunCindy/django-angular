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
  pourcentages;
  productList;
  quantityChange:number = 0;
  promotionChange:number = 0;
  price;
  constructor(public productsService : ProductsService, private http: HttpClient) {
    this.product = [];
   }

  ngOnInit() {
    this.getProducts();
    this.pourcentages = new Array();
    this.pourcentages = ["none", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%"];
  }

  getProducts(){
    this.productsService.getData().subscribe(res => {
      this.products = res.body;
    },
    (err) => {
      alert('failed loading json data');
    }); 
  }

  updateSale(promotionChange, product, price){
    if(parseFloat(promotionChange) || (promotionChange == 0)){
      this.productsService.updateSale(product.id,promotionChange, price).subscribe(res => {
        console.log(res);
        this.getProducts();
        alert("Votre modification de Promotion a bien été effectué.")
      },
      (err) => {
        alert(err.error);
      });
    }else{
      alert("Veuillez vérifier la saisie de votre quantité.");
    }
  }

  updateAll(promotionChange, product, price){
    if(promotionChange != "none"){
      console.log(promotionChange);
    }
  }
}
