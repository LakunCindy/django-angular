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
  afficherUpdatePromo;
  operation;
  afficherPrixAjout;
  prixAjout:number = 0;
  totalPrice:number = 0;

  constructor(public productsService : ProductsService, private http: HttpClient) {
  }

  ngOnInit() {
    this.productsService.getData().subscribe(res => {
        this.products = res.body;
        this.getProductId(12);
        this.productList = this.products[0]
        this.operation="Vendu"
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
        this.quantityChange = 0;
        this.afficherPrixAjout = false;
      },
      (err) => {
        alert(err.error);
      });
    }
  }

  getOperation(value:string){
    if(value == "Ajouter"){
      this.afficherPrixAjout = true;
    }
    else{
      this.afficherPrixAjout = false;
    }
    this.operation = value;
  }

  updateStock(quantityChange, product, price, discount){
    if(parseInt(quantityChange))
    {
      if(this.operation == "Vendu")
      {
        if(discount){
          this.totalPrice = quantityChange * discount;
        }
        else{
          this.totalPrice = quantityChange * price;
        }
        this.productsService.decrementProduct(product.id,quantityChange, this.totalPrice).subscribe(res => {
          console.log(res);
          this.getProductId(product.id);
          alert("Votre modification de stock a bien été effectué.")
        },
        (err) => {
          alert(err.error);
        });
      }
      else if(this.operation == "Perimer")
      {
        this.productsService.decrementProduct(product.id,quantityChange, 0).subscribe(res => {
          console.log(res);
          this.getProductId(product.id);
          alert("Votre modification de stock a bien été effectué.")
        },
        (err) => {
          alert(err.error);
        });
      }
      else if(this.operation == "Ajouter"){
        this.productsService.incrementProduct(product.id,quantityChange, this.prixAjout).subscribe(res => {
          console.log(res);
          this.getProductId(product.id);
          alert("Votre modification de stock a bien été effectué.")
        },
        (err) => {
          alert(err.error);
        });
      }
    }else{
      alert("Veuillez vérifier la saisie de votre promotion.");
    }
  }

  updateSale(promotionChange, product, price){
    if(parseFloat(promotionChange) || (promotionChange == 0)){
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
