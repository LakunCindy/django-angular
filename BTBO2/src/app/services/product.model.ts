import { SimplePlaceholderMapper } from "@angular/compiler/src/i18n/serializers/serializer";

export interface IProduct{
    id:number,
    name:string,
    category:number,
    avaibility:boolean,
    price:number,
    discount:number,
    sale:boolean,
    unit:string,
    quantity:number,
    quantitySold:number,
    operation:string,
    quantityChange:number,
    prixAjout:number,
    owner:string,
    comments:string
}

export class Product implements IProduct{
    constructor(
        public id:number,
        public name:string,
        public category:number,
        public avaibility:boolean,
        public price:number,
        public discount:number,
        public sale:boolean,
        public unit:string,
        public quantity:number,
        public quantitySold:number,
        public operation:string,
        public quantityChange:number,
        public prixAjout:number,
        public owner:string,
        public comments:string){

    }
}
