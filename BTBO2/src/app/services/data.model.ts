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

export interface ITotalGain{
    totalGainPerYear:number
}
export class totalGain implements ITotalGain{
    constructor(
        public totalGainPerYear:number){}
}

export interface IImpot{
    impot:number
    gain:number
    cost:number
}
export class Impot implements IImpot{
    constructor(
        public impot:number,
        public gain:number,
        public cost:number){}
}