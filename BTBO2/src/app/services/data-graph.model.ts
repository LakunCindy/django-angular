export interface IGraph{
    mostSaleQuantity: number
    mostSale:number
    months: Map <string,number>
    days:Map<string,number>
}

export class dataGraph implements IGraph{
    constructor(
        public mostSaleQuantity:number,
        public mostSale:number,
        public months:Map<string,number>,
        public days:Map<string,number>){
            
    }
}