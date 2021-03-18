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
  promotionChange:number = 0;
  price;
  afficherUpdatePromo;
  
  constructor(public productsService : ProductsService, private http: HttpClient) {
  }

  ngOnInit() {
    this.productsService.getData().subscribe(res => {
        this.products = res.body;
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
        this.quantityChange = res.body.quantity;
      },
      (err) => {
        alert(err.error);
      });
    }

  }

  updateStock(quantityChange, product){
    if(parseFloat(quantityChange))
    {
      this.productsService.updateQuantity(product.id,quantityChange).subscribe(res => {
        console.log(res);
        this.getProductId(product.id);
        alert("Votre modification de stock a bien été effectué.")
      },
      (err) => {
        alert(err.error);
      });
    }else{
      alert("Veuillez vérifier la saisie de votre quantité.");
    }
  }

  updateSale(promotionChange, product, price){
    if(parseFloat(promotionChange)){
      this.productsService.updateSale(product.id,promotionChange, price).subscribe(res => {
        console.log(res);
        this.getProductId(product.id);
        alert("Votre modification de Promotion a bien été effectué.")
      },
      (err) => {
        alert(err.error);
      });
    }else{
      alert("Veuillez vérifier la saisie de votre quantité.");
    }
    
  }
}
