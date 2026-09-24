import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
const PORCENTAJE = 100;//puse 100 pq cuando lo dividis por 100 queda 1, para que no se cancele la formula
export class DescuentoEfectivo implements IEstrategiaDeDescuento{


    private porcentaje: number;

    constructor(porcentaje?:number){
        this.porcentaje = porcentaje ?? PORCENTAJE;
    }

    public calcularDescuento(total: number): number {
        return total * (this.porcentaje/100);
    }
}