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
  percentages;
  productList;
  quantityChange:number = 0;
  promotionChange:number = 0;
  price;
  prixAjout:number = 0;
  totalPrice:number = 0;
  constructor(public productsService : ProductsService, private http: HttpClient) {
    this.product = [];
   }

  ngOnInit() {
    this.getProducts();
    this.percentages = new Array();
    this.percentages = ["none", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%"];
  }

  getProducts(){
    this.productsService.getData().subscribe(res => {
      this.products = res.body;
    },
    (err) => {
      alert('failed loading json data');
    }); 
  }

  updateSale(percentage:string, product:Product, price){
    if(percentage != "none"){
      let product_percentage = percentage.replace("%", "");
      this.productsService.updateSale(product.id, parseInt(product_percentage), price).subscribe(res => {
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

  getOperation(operation:string, product:Product){
    product.operation = operation;
  }

  updateQuantityChange(quantityChange:number, product:Product){
    product.quantityChange = quantityChange;
  }

  updatePrixAjout(prixAjout:number, product:Product){
    product.prixAjout = prixAjout;
  }

  updateStock(quantityChange, product, price, discount, prixAjout, category){
    if(parseInt(quantityChange))
    {
      if(product.operation == "Ajouter")
      {
        this.totalPrice = prixAjout;
        this.productsService.incrementProduct(product.id,quantityChange, this.totalPrice).subscribe(res => {
          console.log(res);
          this.getProducts();
          alert("Votre modification de stock a bien été effectué.")
        },
        (err) => {
          alert(err.error);
        });
      }
      else if(product.operation == "Vendu"){
        if(discount){
          this.totalPrice = discount * quantityChange; 
        }
        else{
          this.totalPrice = price * quantityChange;
        }
        this.productsService.decrementProduct(product.id,quantityChange, this.totalPrice, category).subscribe(res => {
          console.log(res);
          this.getProducts();
          alert("Votre modification de stock a bien été effectué.")
        },
        (err) => {
          alert(err.error);
        });
      }
      else{
        this.productsService.decrementProduct(product.id,quantityChange, 0, category).subscribe(res => {
          console.log(res);
          this.getProducts();
          alert("Votre modification de stock a bien été effectué.")
        },
        (err) => {
          alert(err.error);
        });
      }
    }else{
      alert("Veuillez vérifier la saisie de votre quantité.");
    }
  }
}
