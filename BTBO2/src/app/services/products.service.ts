import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IProduct, Product } from '../services/product.model';
import { Observable } from 'rxjs';
import { SERVER_API } from '../app.contants'

type EntityResponseType = HttpResponse<Product>;
type EntityResponseTypeArray = HttpResponse<Product[]>;

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  public resourceUrlApi = 'http://127.0.0.1:8000';

  constructor(protected http: HttpClient) { }

  getData(): Observable<EntityResponseTypeArray> {
    return this.http.get<Product[]>(`${this.resourceUrlApi}/products`, { observe: 'response' })
  }

  incrementProduct(id: number, number: number, totalPrice:number): Observable<EntityResponseType> {
    return this.http.get<Product>(`${this.resourceUrlApi}/incrementStock/${id}/${number}/${totalPrice}`, { observe: 'response' })
  }

  decrementProduct(id: number, number: number, totalPrice:number): Observable<EntityResponseType> {
    return this.http.get<Product>(`${this.resourceUrlApi}/decrementStock/${id}/${number}/${totalPrice}`, { observe: 'response' })
  }

  updateQuantity(id: number, number: number): Observable<EntityResponseType> {
    return this.http.get<Product>(`${this.resourceUrlApi}/updateQuantity/${id}/${number}`, { observe: 'response' })
  }

  /**
   * Obtenir le produit avec sa quantité 
   * @param id : id du produit
   * @returns 
   */
  infoStockProduct(id: number): Observable<EntityResponseType> {
    return this.http.get<Product>(`${this.resourceUrlApi}/product/${id}`, { observe: 'response' })
  }

  /**
   * Met en promotion un produit et le discount = number
   * @param id 
   * @param number 
   * @returns 
   */
  putOnSale(id:number,number:number){
    return this.http.get<Product>(`${this.resourceUrlApi}/putonsale/${id}/${number}`, { observe: 'response' })
  }

  /**
   * Enlève un produit en promotion et met le discount à 0
   * @param id 
   * @returns 
   */
  removeSale(id:number){
    return this.http.get<Product>(`${this.resourceUrlApi}/removesale/${id}`, { observe: 'response' })
  }

  updateSale(id:number, number:number, price:number){
    return this.http.get<Product>(`${this.resourceUrlApi}/updatesale/${id}/${number}/${price}`, { observe: 'response' })
  }




  /**TODO: Api:
   * 
   * - Récuperer une liste de produits où la quantité devra etre update
   * - Récuperer une liste de produits où le pourcentage devra etre update
   * - Nouvelle table : Retrait -> 
   *    Quand on retire un produit, si il est vendu on augmente retrait par vente ou si il est invendus on augmente retrait par invendus
   * 
   * 
   */
  


}
