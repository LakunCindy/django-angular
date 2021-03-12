export interface IProduct{
    id:number,
    name:string,
    category:number,
    avaibility:boolean,
    price:number,
    price_on_sale:number,
    discount:number,
    sale:boolean,
    unit:string,
    quantity_stock:number,
    quantity_sold:number,
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
        public price_on_sale:number,
        public discount:number,
        public sale:boolean,
        public unit:string,
        public quantity_stock:number,
        public quantity_sold:number,
        public owner:string,
        public comments:string){

    }
}
